---
title: API
sidebar:
    order: 3
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


## typings.d.ts
### BrowserItem

#### Constructor

- BrowserItem(label: string, params: BrowserItemParameters): BrowserItem

#### Properties

* params?: BrowserItemParameters

#### Methods

* getChildren(): ProviderResult<BrowserItem[]>
* refresh(): void
* reveal(options: FocusOptions): Thenable<void>
* getToolTip(): Promise<MarkdownString | undefined>

### CodeForIBMi

#### Properties

- instance: Instance
- customUI: () => CustomUI
- deployTools: typeof DeployTools
- evfeventParser: (lines: string[]) => Map<string, FileError[]>
- tools: typeof Tools
- componentRegistry: ComponentRegistry

### DeploymentParameters

#### Properties

- method: DeploymentMethod
- workspaceFolder: WorkspaceFolder
- remotePath: string
- ignoreRules?: Ignore

### StandardIO

#### Properties

- onStdout?: (data: Buffer) => void
- onStderr?: (data: Buffer) => void
- stdin?: string

### RemoteCommand

#### Properties

- title?: string
- command: string
- environment?: ActionEnvironment
- cwd?: string
- env?: Record<string, string>
- noLibList?: boolean

### CommandData

#### Properties

- command: string
- directory?: string
- env?: Record<string, string>

### CommandResult

#### Properties

- code: number
- stdout: string
- stderr: string
- command?: string

### Action

#### Properties

- name: string
- command: string
- type?: ActionType
- environment: ActionEnvironment
- extensions?: string[]
- deployFirst?: boolean
- postDownload?: string[]
- refresh?: ActionRefresh
- runOnProtected?: boolean

### ConnectionData

#### Properties

- name: string
- host: string
- port: number
- username: string
- password?: string
- privateKey?: string
- privateKeyPath?: string
- keepaliveInterval?: number

### Server

#### Properties

- name: string

### Profile

#### Properties

- profile: string

### QsysPath

#### Properties

- asp?: string
- library: string
- name: string

### IBMiObject

#### Properties

- type: string
- text: string
- sourceFile?: boolean
- attribute?: string
- sourceLength?: number
- size?: number
- created?: Date
- changed?: Date
- created_by?: string
- owner?: string

### IBMiMember

#### Properties

- library: string
- file: string
- name: string
- extension: string
- recordLength?: number
- text?: string
- asp?: string
- lines?: number
- created?: Date
- changed?: Date

### IFSFile

#### Properties

- type: "directory" | "streamfile"
- name: string
- path: string
- size?: number
- modified?: Date
- owner?: string

### IBMiError

#### Properties

- code: string
- text: string

### FileError

#### Properties

- sev: number
- lineNum: number
- toLineNum: number
- column: number
- toColumn: number
- text: string
- code: string

### QsysFsOptions

#### Properties

- readonly?: boolean

### WithPath

#### Properties

- path: string

### WithLibrary

#### Properties

- library: string

### FilteredItem

#### Properties

- filter: ConnectionConfiguration.ObjectFilters

### ObjectItem

#### Properties

- object: IBMiObject

### MemberItem

#### Properties

- member: IBMiMember

### WrapResult

#### Properties

- newStatements: string[]
- outStmf: string

## Configuration.d.ts
### StoredConnection

#### Properties

- index: number
- data: ConnectionData

## CustomUI.d.ts
### Section

#### Properties

* fields: Field[]

#### Methods

* addHeading(label: string, level: 1 | 2 | 3 | 4 | 5 | 6): this
* addHorizontalRule(): this
* addCheckbox(id: string, label: string, description: string, checked: boolean): this
* addInput(id: string, label: string, description: string, options: {
        default?: string;
        readonly?: boolean;
        rows?: number;
        minlength?: number;
        maxlength?: number;
        regexTest?: string;
    }): this
* addParagraph(label: string): this
* addFile(id: string, label: string, description: string): this
* addPassword(id: string, label: string, description: string, defaultValue: string): this
* addTabs(tabs: Tab[], selected: number): this
* addComplexTabs(tabs: ComplexTab[], selected: number): this
* addSelect(id: string, label: string, items: SelectItem[], description: string): this
* addTree(id: string, label: string, treeItems: TreeListItem[], description: string): this
* addButtons(buttons: (Button | undefined)[]): this
* addField(field: Field): this

### CustomUI

#### Methods

* loadPage(title: string, callback: (page: Page<T>) => void): Promise<Page<T>> | undefined
* setOptions(options: PanelOptions): this

### Field

#### Constructor

- Field(type: FieldType, id: string, label: string, description: string): Field

#### Properties

* type: FieldType
* id: string
* label: string
* description?: string
* items?: FieldItem[]
* treeList?: TreeListItem[]
* complexTabItems?: ComplexTab[]
* default?: string
* readonly?: boolean
* rows?: number
* minlength?: number
* maxlength?: number
* regexTest?: string

#### Methods

* getHTML(): string

### Page

#### Properties

- panel: vscode.WebviewPanel
- data?: T

### Button

#### Properties

- id: string
- label: string
- requiresValidation?: boolean

### SelectItem

#### Properties

- text: string
- description: string
- value: string
- selected?: boolean

### Tab

#### Properties

- label: string
- value: string

### ComplexTab

#### Properties

- label: string
- fields: Field[]

### TreeListItemIcon

#### Properties

- branch?: string
- open?: string
- leaf?: string

### TreeListItem

#### Properties

- label: string
- subItems?: TreeListItem[]
- open?: boolean
- selected?: boolean
- focused?: boolean
- icons?: TreeListItemIcon
- value?: string
- path?: number[]

### FieldItem

#### Properties

- label?: string
- value?: string
- selected?: boolean
- description?: string
- text?: string
- id?: string

## Instance.d.ts
### Instance

#### Constructor

- Instance(context: vscode.ExtensionContext): Instance

#### Methods

* setConnection(connection: IBMi): Promise<void>
* getConnection(): IBMi
* setConfig(newConfig: ConnectionConfiguration.Parameters): Promise<void>
* getConfig(): ConnectionConfiguration.Parameters
* getContent(): import("./IBMiContent").default
* getStorage(): ConnectionStorage
* subscribe(context: vscode.ExtensionContext, event: IBMiEvent, name: string, func: Function, transient: boolean): void
* onEvent(event: IBMiEvent, func: Function): void
* fire(event: IBMiEvent): void
* processEvent(event: IBMiEvent): Promise<void>

## IBMi.d.ts
### IBMi

#### Constructor

- IBMi(): IBMi

#### Properties

* client: node_ssh.NodeSSH
* currentHost: string
* currentPort: number
* currentUser: string
* currentConnectionName: string
* tempRemoteFiles: {
        [name: string]: string;
    }
* defaultUserLibraries: string[]
* outputChannel?: vscode.OutputChannel
* outputChannelContent?: string
* aspInfo: {
        [id: number]: string;
    }
* remoteFeatures: {
        [name: string]: string | undefined;
    }
* variantChars: {
        american: string;
        local: string;
    }
* lastErrors: object[]
* config?: ConnectionConfiguration.Parameters
* content: IBMiContent
* shell?: string
* commandsExecuted: number
* maximumArgsLength: number
* dangerousVariants: boolean

#### Methods

* connect(connectionObject: ConnectionData, reconnecting: boolean, reloadServerSettings: boolean, onConnectedOperations: Function[]): Promise<{
        success: boolean;
        error?: any;
    }>
* usingBash(): boolean
* runCommand(data: RemoteCommand): Promise<CommandResult>
* sendQsh(options: CommandData): Promise<CommandResult>
* sendCommand(options: CommandData): Promise<CommandResult>
* end(): Promise<void>
* sqlRunnerAvailable(): boolean
* getTempRemote(key: string): string
* parserMemberPath(string: string, checkExtension: boolean): MemberParts
* sysNameInLocal(string: string): string
* sysNameInAmerican(string: string): string
* uploadFiles(files: {
        local: string | vscode.Uri;
        remote: string;
    }[], options: node_ssh.SSHPutFilesOptions): Promise<void>
* downloadFile(localFile: string | vscode.Uri, remoteFile: string): Promise<void>
* uploadDirectory(localDirectory: string | vscode.Uri, remoteDirectory: string, options: node_ssh.SSHGetPutDirectoryOptions): Promise<void>
* downloadDirectory(localDirectory: string | vscode.Uri, remoteDirectory: string, options: node_ssh.SSHGetPutDirectoryOptions): Promise<void>
* getLastDownloadLocation(): string
* setLastDownloadLocation(location: string): Promise<void>
* fileToPath(file: string | vscode.Uri): string
* withTempDirectory(process: (directory: string) => Promise<T>): Promise<T>
* upperCaseName(name: string): string
* getComponent(type: IBMiComponentType<T>, ignoreState: boolean): T | undefined
* runSQL(statements: string): Promise<Tools.DB2Row[]>
* getEncoding(): {
        fallback: boolean;
        ccsid: number;
        invalid: boolean;
    }
* getCcsids(): {
        qccsid: number;
        runtimeCcsid: number;
        userDefaultCCSID: number;
    }
* checkUserSpecialAuthorities(authorities: SpecialAuthorities[], user: string): Promise<{
        valid: boolean;
        missing: SpecialAuthorities[];
    }>

### MemberParts

#### Properties

- basename: string

## component.d.ts
### IBMiComponent

#### Constructor

- IBMiComponent(connection: IBMi): IBMiComponent

#### Properties

* connection: IBMi

#### Methods

* getState(): ComponentState
* check(): Promise<this>
* toString(): string
* getIdentification(): ComponentIdentification
* getRemoteState(): ComponentState | Promise<ComponentState>
* update(): ComponentState | Promise<ComponentState>

## IBMiContent.d.ts
### IBMiContent

#### Constructor

- IBMiContent(ibmi: IBMi): IBMiContent

#### Properties

* ibmi: IBMi

#### Methods

* downloadStreamfileRaw(remotePath: string, localPath: string): Promise<Buffer>
* downloadStreamfile(remotePath: string, localPath: string): Promise<string>
* writeStreamfileRaw(originalPath: string, content: Uint8Array, encoding: string): Promise<string | void>
* writeStreamfile(originalPath: string, content: string): Promise<string | void>
* downloadMemberContent(asp: string | undefined, library: string, sourceFile: string, member: string, localPath: string): Promise<string>
* uploadMemberContent(asp: string | undefined, library: string, sourceFile: string, member: string, content: string | Uint8Array): Promise<boolean>
* runStatements(statements: string[]): Promise<Tools.DB2Row[]>
* runSQL(statements: string): Promise<Tools.DB2Row[]>
* getTable(library: string, file: string, member: string, deleteTable: boolean): Promise<Tools.DB2Row[]>
* getQTempTable(prepareQueries: string[], table: string): Promise<Tools.DB2Row[]>
* getLibraryList(libraries: string[]): Promise<IBMiObject[]>
* validateLibraryList(newLibl: string[]): Promise<string[]>
* getLibraries(filters: {
        library: string;
        filterType?: FilterType;
    }): Promise<IBMiObject[]>
* getObjectList(filters: {
        library: string;
        object?: string;
        types?: string[];
        filterType?: FilterType;
    }, sortOrder: SortOrder): Promise<IBMiObject[]>
* getMemberList(filter: {
        library: string;
        sourceFile: string;
        members?: string;
        extensions?: string;
        sort?: SortOptions;
        filterType?: FilterType;
    }): Promise<IBMiMember[]>
* getMemberInfo(library: string, sourceFile: string, member: string): Promise<IBMiMember | undefined>
* getFileList(remotePath: string, sort: SortOptions, onListError: (errors: string[]) => void): Promise<IFSFile[]>
* memberResolve(member: string, files: QsysPath[]): Promise<IBMiMember | undefined>
* objectResolve(object: string, libraries: string[]): Promise<string | undefined>
* streamfileResolve(names: string[], directories: string[]): Promise<string | undefined>
* parseIBMiErrors(errorsString: string): IBMiError[]
* isDirectory(remotePath: string): Promise<boolean>
* checkObject(object: {
        library: string;
        name: string;
        type: string;
        member?: string;
    }, authorities: Authority[]): Promise<boolean>
* testStreamFile(path: string, right: "e" | "f" | "d" | "r" | "w" | "x"): Promise<boolean>
* isProtectedPath(path: string): boolean
* toCl(command: string, parameters: {
        [parameter: string]: string | number | undefined;
    }): string
* getAttributes(path: string | (QsysPath & {
        member?: string;
    }), operands: AttrOperands[]): Promise<Record<string, string>>
* countMembers(path: QsysPath): Promise<number>
* countFiles(directory: string): Promise<number>
* objectToToolTip(path: string, object: IBMiObject): MarkdownString
* sourcePhysicalFileToToolTip(path: string, object: IBMiObject): Promise<MarkdownString>
* memberToToolTip(path: string, member: IBMiMember): MarkdownString
* ifsFileToToolTip(path: string, ifsFile: IFSFile): MarkdownString
* createStreamFile(path: string): Promise<void>

## Storage.d.ts
### Storage

#### Constructor

- Storage(context: vscode.ExtensionContext): Storage

#### Properties

* globalState: any

#### Methods

* keys(): readonly string[]
* get(key: string): T | undefined
* set(key: string, value: any): Promise<void>
* getStorageKey(key: string): string

### GlobalStorage

#### Static

- initialize(context: vscode.ExtensionContext): void
- get(): GlobalStorage

#### Constructor

- GlobalStorage(): GlobalStorage

#### Methods

* getStorageKey(key: string): string
* getLastConnections(): LastConnection[]
* setLastConnection(name: string): Promise<void>
* setLastConnections(lastConnections: LastConnection[]): Promise<void>
* getServerSettingsCache(name: string): {
        aspInfo: {
            [id: number]: string;
        };
        qccsid: number;
        jobCcsid: number;
        remoteFeatures: {
            [name: string]: string;
        };
        remoteFeaturesKeys: string;
        variantChars: {
            american: string;
            local: string;
        };
        badDataAreasChecked: boolean;
        libraryListValidated: boolean;
        pathChecked?: boolean;
        userDefaultCCSID: number;
        debugConfigLoaded: boolean;
        maximumArgsLength: number;
    }
* setServerSettingsCache(name: string, serverSettings: CachedServerSettings): Promise<void>
* setServerSettingsCacheSpecific(name: string, newSettings: Partial<CachedServerSettings>): Promise<void>
* deleteServerSettingsCache(name: string): Promise<void>
* deleteStaleServerSettingsCache(connections: ConnectionData[]): Promise<void>
* getPreviousSearchTerms(): string[]
* addPreviousSearchTerm(term: string): Promise<void>
* clearPreviousSearchTerms(): Promise<void>
* getPreviousFindTerms(): string[]
* addPreviousFindTerm(term: string): Promise<void>
* clearPreviousFindTerms(): Promise<void>

### ConnectionStorage

#### Constructor

- ConnectionStorage(context: vscode.ExtensionContext): ConnectionStorage

#### Methods

* setConnectionName(connectionName: string): void
* getStorageKey(key: string): string
* getSourceList(): PathContent
* setSourceList(sourceList: PathContent): Promise<void>
* getLastProfile(): string
* setLastProfile(lastProfile: string): Promise<void>
* getPreviousCurLibs(): string[]
* setPreviousCurLibs(previousCurLibs: string[]): Promise<void>
* getDeployment(): DeploymentPath
* setDeployment(existingPaths: DeploymentPath): Promise<void>
* getDebugCommands(): DebugCommands
* setDebugCommands(existingCommands: DebugCommands): Promise<void>
* getWorkspaceDeployPath(workspaceFolder: vscode.WorkspaceFolder): string
* getRecentlyOpenedFiles(): string[]
* setRecentlyOpenedFiles(recentlyOpenedFiles: string[]): Promise<void>
* clearRecentlyOpenedFiles(): Promise<void>
* grantExtensionAuthorisation(extension: vscode.Extension<any>): Promise<void>
* getExtensionAuthorisation(extension: vscode.Extension<any>): AuthorisedExtension
* getAuthorisedExtensions(): AuthorisedExtension[]
* revokeAllExtensionAuthorisations(): void
* revokeExtensionAuthorisation(extensions: AuthorisedExtension[]): Promise<void>

## manager.d.ts
### ComponentRegistry

#### Methods

* registerComponent(context: vscode.ExtensionContext, component: IBMiComponentType<any>): void
* getComponents(): Map<string, IBMiComponentType<any>[]>

### ComponentManager

#### Constructor

- ComponentManager(connection: IBMi): ComponentManager

#### Methods

* startup(): Promise<void>
* get(type: IBMiComponentType<T>, ignoreState: boolean): T | undefined

