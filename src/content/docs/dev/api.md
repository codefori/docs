---
title: API
sidebar:
    order: 3
    badge:
      text: Updated
      variant: success
---

It is possible to write VS Code extensions that are based on Code for IBM i. That means your extension can use the connection that the user creates in your extension. This is not an extension tutorial, but an intro on how to access the APIs available within Code for IBM i.

For example, you might be a vendor that produces lists or HTML that you'd like to be accessible from within Visual Studio Code.

# Exports

As well as the basic VS Code command API, you can get access to the Code for IBM i API with the VS Code `getExtension` API.

```ts
const { instance } = vscode.extensions.getExtension(`halcyontechltd.code-for-ibmi`).exports;
```

## Typings

We provide TS type definitions to make using the Code for IBM i API easier. They can be installed via `npm`:

```bash title="terminal"
npm i @halcyontech/vscode-ibmi-types
```

It can then be imported and used in combination with `getExtension`:

```ts
import type { CodeForIBMi } from '@halcyontech/vscode-ibmi-types';

//...

const ext = vscode.extensions.getExtension<CodeForIBMi>('halcyontechltd.code-for-ibmi');
```


**As Code for IBM i updates, the API may change. It is recommended you always keep the types packaged updated as the extension updates, incase the API interfaces change. We plan to make the VS Code command API interfaces stable so they will not break as often after they have been released.**

## Example import

This example can be used as a simple way to access the Code for IBM i instance.

```ts
import { CodeForIBMi } from "@halcyontech/vscode-ibmi-types";
import Instance from "@halcyontech/vscode-ibmi-types/api/Instance";
import { Extension, extensions } from "vscode";

let baseExtension: Extension<CodeForIBMi>|undefined;

/**
 * This should be used on your extension activation.
 */
export function loadBase(): CodeForIBMi|undefined {
  if (!baseExtension) {
    baseExtension = (extensions ? extensions.getExtension(`halcyontechltd.code-for-ibmi`) : undefined);
  }
  
  return (baseExtension && baseExtension.isActive && baseExtension.exports ? baseExtension.exports : undefined);
}

/**
 * Used when you want to fetch the extension 'instance' (the connection)
 */
export function getInstance(): Instance|undefined {
  return (baseExtension && baseExtension.isActive && baseExtension.exports ? baseExtension.exports.instance : undefined);
}
```

# API surface

The object returned by `getExtension('halcyontechltd.code-for-ibmi').exports` implements the `CodeForIBMi` interface. Beside `instance`, it exposes a number of helpers that are used by Code for IBM i itself, so extensions built on top of it can render, search, deploy and configure things exactly the same way.

| Member | Type | Description |
|--------|------|-------------|
| `instance` | `Instance` | The connection: connect/disconnect, current `IBMi` connection, storage and event subscriptions. |
| `customUI` | `() => CustomUI` | Builder for webview forms and panels. |
| `customEditor` | `<T>(target, onSave, onClosed?) => CustomEditor<T>` | Builder for a custom editor (a webview opened as an editor tab, with save support). |
| `evfeventParser` | `(lines: string[]) => Map<string, FileError[]>` | Parses the content of an `EVFEVENT` member into errors, grouped by file. |
| `tools` | `typeof VscodeTools` | VS Code side utilities: tooltips, HTML escaping, document/tab lookup, path helpers. |
| `frontendTables` | `typeof FrontendTables` | HTML generators for the tables used in the webviews (list tables and detail tables). |
| `viewSettings` | `typeof ViewSettings` | Reads the settings that shape the shared views (page size, auto refresh interval). |
| `deployTools` | `typeof DeployTools` | Deployment of a workspace folder to the IFS. |
| `actionTools` | `typeof ActionTools` | Reads and updates the Actions (local and connection ones). |
| `componentRegistry` | `ComponentRegistry` | Register your own components so they get installed and checked on connect. |
| `connectionManager` | `ConnectionManager` | Stored connections and global/connection settings. |
| `searchTools` | `typeof SearchTools` | Search in source members and in the IFS. |
| `onCodeForIBMiConfigurationChange` | `(props, todo) => Disposable` | Subscribe to changes of one or more `code-for-ibmi.*` settings. |

All the examples below assume the `loadBase()` / `getInstance()` helpers shown above.

## `instance`

The entry point to the connection. Use `getConnection()` to get the current `IBMi` object (it returns `undefined` when there is no connection), and `subscribe` to react to connection events.

```ts
const instance = getInstance();

const connection = instance.getConnection();
if (connection) {
  const config = connection.getConfig();
  const content = connection.getContent();
}

// Each context/name couple must be unique.
instance.subscribe(context, `connected`, `Refresh my view`, () => myView.refresh());
```

The available events are `connected`, `disconnected`, `deployLocation` and `deploy`. See [API Examples](../examples/) for more.

:::note
`Instance.getConfig()`, `Instance.getContent()` and `Instance.onEvent()` are deprecated: use `IBMi.getConfig()`, `IBMi.getContent()` and `Instance.subscribe()` instead.
:::

## `customUI`

Creates a `CustomUI`, the builder used to produce the webview forms of Code for IBM i (the Settings page, the login page, and so on). Fields are added with the `add*` methods and the page is opened with `loadPage`, which resolves when the user submits it.

```ts
const base = loadBase();

const page = await base.customUI()
  .addHeading(`My tool`, 2)
  .addInput(`library`, `Library`, `The library to work on`, { default: `QGPL` })
  .addSelect(`mode`, `Mode`, [
    { text: `Read only`, description: `Do not change anything`, value: `read` },
    { text: `Read/write`, description: `Apply the changes`, value: `write` }
  ])
  .addButtons({ id: `apply`, label: `Apply`, requiresValidation: true })
  .loadPage<{ library: string, mode: string }>(`My tool`);

if (page) {
  page.panel.dispose();
  if (page.data) {
    // page.data.library, page.data.mode
  }
}
```

`loadPage` returns `undefined` when a page with the same title is already open: in that case the existing panel simply gets the focus.

## `customEditor`

Same builder as `customUI` (it extends the same HTML builder), but the result is opened as an editor tab instead of a webview panel, and the data is pushed back through a callback whenever the user saves.

```ts
const editor = base.customEditor<MyData>(
  `my-extension.myThing`,       // target: identifies what is being edited
  async data => await save(data),
  () => console.log(`closed`)
);

editor.addInput(`text`, `Text`);
editor.open();
```

## `evfeventParser`

Turns the lines of an `EVFEVENT` member into a map of `FileError[]`, keyed by the file the errors belong to. Useful when you run your own compilation and want to show the errors the way Code for IBM i does.

```ts
const content = await connection.getContent().downloadMemberContent(library, `EVFEVENT`, sourceName);
const errors = base.evfeventParser(content.split(`\n`));
```

## `tools`

`VscodeTools` groups the helpers that need the VS Code namespace, plus the re-exported path/string helpers of the core `Tools`:

| Function | Description |
|----------|-------------|
| `getGitAPI()` | The Git extension API, when available. |
| `escapeHtml(html)` | Escapes a string before injecting it in a webview. |
| `generateTooltipHtmlTable(header, rows)` | Builds the HTML table used in the tree items tooltips. |
| `objectToToolTip(path, object)`, `memberToToolTip`, `ifsFileToToolTip`, `filterToToolTip`, `profileToToolTip` | Ready-made tooltips for the standard IBM i entities. |
| `findExistingDocument(uri)`, `findExistingDocumentUri(uri)`, `findExistingDocumentByName(nameAndExt)`, `findUriTabs(uri)` | Look up documents and tabs already opened. |
| `areEquivalentUris(a, b)` | Compares two URIs ignoring the query part. |
| `withContext(context, task)` | Runs `task` while a `when` clause context is set to `true`. |
| `md5Hash(file)`, `parseStatusBarColor(color)`, `includesCaseInsensitive(haystack, needle)` | Misc. helpers. |
| `qualifyPath`, `unqualifyPath`, `escapePath`, `parseQSysPath`, `normalizePath`, `resolvePath`, `fixWindowsPath`, `fileToPath`, `ensureFullPath` | Path helpers re-exported from the core `Tools`. |
| `distinct`, `capitalize`, `makeid`, `sanitizeObjNamesForPase`, `parseMessages`, `parseAttrDate` | String/array helpers re-exported from the core `Tools`. |

## `frontendTables`

Generates the HTML of the tables used in the Code for IBM i webviews, so an extension can render lists and detail pages with the same look, theming and behaviour.

* `generateFastTable<T>(options)` – a full page with a data table. Supports sticky header, collapsible columns (shown in a modal), a search bar and pagination.
* `generateFastTableUpdate<T>(options)` – builds the message to post to the webview to replace the rows of a table already on screen, without rebuilding the page.
* `generateDetailTable(options)` – a key/value detail page, with optional action buttons.

```ts
const html = base.frontendTables.generateFastTable({
  title: `Members`,
  subtitle: `${members.length} members`,
  columns: [
    { title: `Name`, getValue: m => m.name, width: `1fr` },
    { title: `Type`, getValue: m => m.extension, width: `1fr` },
    { title: `Text`, getValue: m => m.text, width: `3fr` }
  ],
  data: members,
  enableSearch: true,
  enablePagination: true,
  tableId: `members`
});

panel.webview.html = html;
```

Search and pagination are server-side: the webview posts a `search` or `paginate` message (carrying `tableId`, `searchTerm`, `page` and `itemsPerPage`) and expects the extension to answer with the payload built by `generateFastTableUpdate`:

```ts
panel.webview.onDidReceiveMessage(async message => {
  if (message.command === `search` || message.command === `paginate`) {
    const rows = await fetchPage(message.searchTerm, message.page, message.itemsPerPage);
    panel.webview.postMessage(base.frontendTables.generateFastTableUpdate({
      columns,
      data: rows.items,
      totalItems: rows.total,
      currentPage: message.page,
      tableId: `members`   // must be the same id the table was rendered with
    }));
  }
});
```

:::caution
A table that has to be updated must be rendered with an explicit `tableId`: updates carrying a different id are discarded by every table on the page. Tables without a `tableId` get an auto-generated one, which is fine for display-only tables.
:::

## `viewSettings`

Reads the settings that shape the shared views, applying the same defaults and bounds as Code for IBM i. Reading the settings directly, or clamping them on your side, is what makes a table render pages of one size while its query fetches another.

| Function | Setting | Description |
|----------|---------|-------------|
| `getItemsPerPage()` | `code-for-ibmi.tables.itemsPerPage` | Page size for the paginated tables. Defaults to `50` and is never lower than `30`. Use it for your own `LIMIT`/`OFFSET` too. |
| `getAutoRefreshInterval()` | `code-for-ibmi.views.autoRefreshInterval` | Auto refresh interval **in milliseconds** (the setting is in seconds). Returns `0` when auto refresh is disabled. |

```ts
const pageSize = base.viewSettings.getItemsPerPage();
const rows = await connection.runSQL(`select * from ${table} limit ${pageSize} offset ${page * pageSize}`);

const interval = base.viewSettings.getAutoRefreshInterval();
if (interval > 0) {
  timer = setInterval(() => refresh(), interval);
}
```

## `deployTools`

Deploys a workspace folder to its remote directory on the IFS.

| Function | Description |
|----------|-------------|
| `launchDeploy(workspaceIndex?, method?, selectedFiles?)` | Runs the deployment interactively (prompting for what is missing) and returns the remote directory and workspace id. |
| `deploy(parameters)` | Runs a deployment described by a `DeploymentParameters` object. |
| `getRemoteDeployDirectory(workspaceFolder)` | The remote directory currently associated with the folder. |
| `setDeployLocation(node, workspaceFolder?, value?, method?, selectedFiles?)` | Sets the remote directory of a folder. |
| `getDeployChangedFiles`, `getDeployGitFiles`, `getDeployCompareFiles`, `getDeployAllFiles` | The file lists behind each deployment method. |
| `launchActionsSetup(workspaceFolder?)` | Creates the `.vscode/actions.json` file from a template. |
| `getDefaultIgnoreRules(workspaceFolder)`, `buildPossibleDeploymentDirectory(workspace)` | Ignore rules and default remote directory. |

## `actionTools`

Reads and writes the Actions, both the local ones (`.vscode/actions.json` of a workspace folder) and the ones stored in the connection settings.

```ts
// All the actions available for a workspace folder (local + connection)
const actions = await base.actionTools.getActions(workspaceFolder);

// Only the ones stored in the connection settings
const connectionActions = base.actionTools.getConnectionActions();

// Create, rename or delete an action
await base.actionTools.updateAction(action, workspaceFolder, { newName: `New name` });
await base.actionTools.updateAction(action, workspaceFolder, { delete: true });
```

## `componentRegistry`

Registers an `IBMiComponent` provided by your extension. Registered components are installed and checked by Code for IBM i on every connection, and can then be retrieved from the connection.

```ts
base.componentRegistry.registerComponent(context, new MyComponent());

// later, once connected
const component = await connection.getComponent<MyComponent>(MyComponent.ID);
```

## `connectionManager`

Access to the stored connections and to the settings.

```ts
// Stored connections
const connections = base.connectionManager.getAll();
const found = base.connectionManager.getByName(`My IBM i`);

// Settings
const itemsPerPage = base.connectionManager.get<number>(`tables.itemsPerPage`);
await base.connectionManager.set(`myKey`, myValue);

// Per connection settings
const settings = base.connectionManager.getConnectionSettings();
```

## `searchTools`

The search used by the *Search* view, usable on your own selections.

| Function | Description |
|----------|-------------|
| `searchMembers(connection, library, sourceFile, searchTerm, members, readOnly?)` | Searches a term in source members. `members` is either a generic name (e.g. `QRPGLESRC`, `*`) or a list of `IBMiMember`. |
| `searchIFS(connection, path, searchTerm)` | Searches a term in the content of the files under a directory. |
| `findIFS(connection, path, findTerm)` | Finds files by name under a directory. |

```ts
const results = await base.searchTools.searchMembers(connection, `MYLIB`, `QRPGLESRC`, `EXEC SQL`, `*`);
```

## `onCodeForIBMiConfigurationChange`

Subscribes to the change of one or more `code-for-ibmi.*` settings (the prefix is added for you). Returns a `Disposable`, so it can be pushed to your subscriptions.

```ts
context.subscriptions.push(
  base.onCodeForIBMiConfigurationChange([`tables.itemsPerPage`, `views.autoRefreshInterval`], () => {
    myView.refresh();
  })
);
```

## Outside of VS Code

**This is not production ready**.

<details>
<summary>Click to expand</summary>

On the main branch of vscode-ibmi, the IBM i API is written so it is can be portable and used outside of the VS Code namespace (this is how the vitest tests work). Until we publish the API as a standalone package, you will need to manually import the API.

After using `npm i github:codefori/vscode-ibmi`, you will need to cleanup/remove everything but the `src/api` directory.

```ts
//#webpack.config.js

function prepareIbmiApi() {
  const ibmiApi = path.join(__dirname, `node_modules`, `vscode-ibmi`, `src`, `api`);
  const ibmiPackage = path.join(__dirname, `node_modules`, `vscode-ibmi`, `src`);

  const checkDirectory = (dir) => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        const canDelete = !ibmiApi.startsWith(filePath) && !filePath.startsWith(ibmiApi);
        if (stat.isDirectory()) {
          // If the directory is not the api directory, delete it
          if (canDelete) {
            fs.rmdirSync(filePath, { recursive: true });
            // console.log(`Deleted directory: ${filePath}`);
          } else {
            checkDirectory(filePath);
          }
        } else if (stat.isFile()) {
          if (canDelete) {
            fs.unlinkSync(filePath);
            // console.log(`Deleted file: ${filePath}`);
          }
        }
      });
    }
  }

  checkDirectory(ibmiPackage);
}
```

You will also need to enable `allowTsInNodeModules: true` with `ts-loader` in webpack.
</details>