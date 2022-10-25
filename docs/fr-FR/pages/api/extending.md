Il est possible d'écrire une extension VS Code extensions en se basant sur Code for IBM i.  
Cela signifie que votre extension peut utiliser la connexion que l'utilisateur crée dans Code For IBM i.  
Ce n'est pas un tutoriel d'extension, mais une introduction sur la façon d'accéder aux API disponibles dans Code For IBM i.

Par exemple, vous pourriez être un fournisseur qui produit des listes ou HTML que vous souhaitez être accessible à partir de l'intérieur Visual Studio Code.

# Exemples

Voir les bases de code en suivant les exemples issus d'extensions complètes basées sur Code for IBM i:

* [VS Code extension to manage IBM i IWS services](https://github.com/halcyon-tech/vscode-ibmi-iws)
* [Git for IBM i extension](https://github.com/halcyon-tech/git-client-ibmi)

# Les commandes de l'API

## Executer une commande avec la liste des bibliothèques d'utilisateurs

Code for IBM i livre une commande qui peut être utilisée par une extension pour exécuter une commande distante sur l'IBM I: `code-for-ibmi.runCommand`.

Il a un paramètre qui est un objet (javascript) avec certaines propriétés:

```ts
interface CommandInfo {
  /** describes what environment the command will be executed. Is optional and defaults to `ile` */
  environment?: `pase`|`ile`|`qsh`;
  /** set this as the working directory for the command when it is executed. Is optional and defaults to the users working directory in Code for IBM i. */
  cwd?: string;
  command: string;
}
```

* La commande peut également utiliser des [champs Saisis](/fr-FR/pages/developing/actions/execution?id=invite).
* Lors de l'exécution d'une commande dans le `ile` ou `qsh` environnement, il utilisera la liste des bibliothèques à partir de la connexion courante.

La commande renvoie un objet:

```ts
interface CommandResult {
  stdout: string;
  stderr: string;
  code: number;
}
```

```js
const result: CommandResult = await vscode.commands.executeCommand(`code-for-ibmi.runCommand`, {
  environment: `pase`,
  command: `ls`
});

// or

const result = await vscode.commands.executeCommand(`code-for-ibmi.runCommand`, {
  environment: `pase`,
  command: `ls`
});
```

## Exécution de requêtes SQL

Code for IBM i a une commande qui vous permet d'exécuter des instructions SQL et d'obtenir un résultat.

```js
const rows: Object[] = await vscode.commands.executeCommand(`code-for-ibmi.runQuery`, statement);

// or

const rows = await vscode.commands.executeCommand(`code-for-ibmi.runQuery`, statement);
```

## Récupérer le contenu d'un membre ou d'un fichier

Les extensions peuvent utiliser les systèmes de fichiers fournis par Code for IBM i.

`openTextDocument` renvoie un [document en texte](https://code.visualstudio.com/api/references/vscode-api#TextDocument).

**Récupérer un membre**

```js
const doc = await vscode.workspace.openTextDocument(vscode.Uri.from({
  scheme: `member`,
  path: `/${library}/${file}/${name}.${extension}`
}));
```

**Récupérer un fichier **
```js
const doc = await vscode.workspace.openTextDocument(vscode.Uri.from({
  scheme: `streamfile`,
  path: streamfilePath
}));
```

## Se Connecter à un système

Il est possible pour votre API d'automatiser la connexion d'un utilisateur à un IBM I au lieu de l'utilisateur à l'aide de la vue de connexion.

```js
const connected: boolean = await vscode.commands.executeCommand(`code-for-ibmi.connectDirect`, ConnectionData);

if (connected) {
  // do a thing.
} else {
  // something went wrong.
}
```

voir `global.d.ts` pour l'interface `ConnectionData`.

# Particularités

## Options de clic droit

Il est possible que votre extension ajoute des options de clic droit pour:

* Objets de l'explorateur d'objet
* Membres de l'explorateur d'objet
* Répertoires de l'explorateur IFS
* Fichiers de l'explorateur IFS
* et bien plus encore...

Vous enregistrez une commande comme d'habitude, mais vous ajoutez un paramètre pour le nœud choisi dans l'arborescence.Voici un exemple pour supprimer un fichier dans l'explorateur IFS.

```js
context.subscriptions.push(
  // `node` is the object passed in directly from the IFS Browser.
  vscode.commands.registerCommand(`code-for-ibmi.deleteIFS`, async (node) => {
    if (node) {
      //Running from right click
      let result = await vscode.window.showWarningMessage(`Are you sure you want to delete ${node.path}?`, `Yes`, `Cancel`);

      if (result === `Yes`) {
        // directory using the connection API.
        const connection = instance.getConnection();

        try {
          // Run a pase command
          await vscode.commands.executeCommand(`code-for-ibmi.runCommand`, {
            command: `rm -rf "${node.path}`,
            environment: `pase`,
          });

          vscode.window.showInformationMessage(`Deleted ${node.path}.`);

          this.refresh();
        } catch (e) {
          vscode.window.showErrorMessage(`Error deleting streamfile! ${e}`);
        }
      }
    } else {
      // If it's reached this point, it usually 
      // indicates that it's running from the command palette
    }
  })
);
```

Suite à cela, nous devons enregistrer la commande afin qu'elle ait une étiquette.Nous faisons cela dans `package.json`

```json
{
  "command": "code-for-ibmi.deleteIFS",
  "title": "Delete object",
  "category": "Your extension"
}
```

Enfin, nous l'ajoutons à un menu contextuel:

```json
"menus": {
  "view/item/context": [
    {
      "command": "code-for-ibmi.deleteIFS",
      "when": "view == ifsBrowser",
      "group": "yourext@1"
    },
  ]
}
```

**When, ajouter votre commande à un menu contextuel**, Il y a beaucoup de valeurs possibles pour la clause `When` :

* `view` peut être `ifsBrowser` orou `objectBrowser`.
* `viewItem` peut être différent en fonction de la vue:
   * Pour `ifsBrowser`, cela peut être `directory` ou `streamfile`
   * Pour `objectBrowser`, cela peut être `member` (membre source), `object` (tout type d'objet), `SPF` (fichier source) or `filter`.

Cela permet à votre extension de fournir des commandes pour des types spécifiques d'objets ou d'éléments spécifiques dans l'arborescence.

[En savoir plus sur la clause when sur le site de documentation de VS Code.](https://code.visualstudio.com/api/references/when-clause-contexts)

## Vues

Code for IBM i fournit un contexte pour que vous puissiez contrôler quand une commande, vue, etc., peut fonctionner. `code-for-ibmi.connected` peut et doit être utilisé si votre vue dépend d'une connexion.Par exemple

Ceci affichera une vue de bienvenue lorsqu'il n'y a pas de connexion:

```json
		"viewsWelcome": [{
			"view": "git-client-ibmi.commits",
			"contents": "No connection found. Please connect to an IBM i.",
			"when": "code-for-ibmi:connected !== true"
		}],
```

Cela montrera une vue lorsqu'il y a une connexion:

```json
    "views": {
      "scm": [{
        "id": "git-client-ibmi.commits",
        "name": "Commits",
        "contextualTitle": "IBM i",
        "when": "code-for-ibmi:connected == true"
      }]
    }
```

# Imports

```
const { instance } = vscode.extensions.getExtension(`halcyontechltd.code-for-ibmi`).exports;
```

`instance` a quelques méthodes à utiliser:

* `getConnection()`: [`IBMi`](https://github.com/halcyon-tech/vscode-ibmi/blob/master/src/api/IBMi.js)`|undefined` Pour obtenir la connexion courante.Retournera `Undefined` lorsque l'espace de travail actuel n'est pas connecté à un système distant.

* `getContent(): `[`IBMiContent`](https://github.com/halcyon-tech/vscode-ibmi/blob/master/src/api/IBMiContent.js) Pour travailler avec du contenu sur la connexion courante
  * Cette API ne doit être utilisée que pour récupérer le contenu de fichiers et des membres.

* `getConfig(): `[`Configuration`](https://github.com/halcyon-tech/vscode-ibmi/blob/master/src/api/Configuration.js) Pour obtenir/définir la configuration de la connexion courante

### Bibliothèque temporaire

N'oubliez pas que vous ne pouvez pas utiliser `QTEMP` parce que chaque commande s'exécute dans un nouveau travail. Prière de se référer à `instance.getConfig().tempLibrary` pour la bibliothèque temporaire de l'utilisateur.

### Stockage de configuration spécifique à la connexion

Il est probable qu'il y aura une configuration spécifique à une connexion. Vous pouvez facilement utiliser `Configuration` pour obtenir et définir la configuration spécifique pour la connexion  à votre extension:

```js
const config = instance.getConfig();
const someArray = config.get(`someArray`) || [];

someArray.push(someUserItem);

config.set(`someArray`, someArray);
```

### Y a-t-il une connexion?

Vous pouvez utiliser `instance.getConnection()` pour déterminer s'il y a une connexion active:

```js
async getChildren(element) {
  const connection = instance.getConnection();

  /** @type {vscode.TreeItem[]} */
  let items = [];

  if (connection) {
    //Do work here...

  } else {
    items = [new vscode.TreeItem(`Please connect to an IBM i and refresh.`)];
  }

  return items;
}
```

### `connected` event

Il est recommandé d'utiliser l'événement `activationEvents` pour faire en sorte que l'extension soit activée uniquement lorsqu'elle est affichée ou qu'une commande est activée.  
Si vous vous référez à la section **views**, faites en sorte que la vue soit affichée uniquement lorsqu'elle est connectée, puis utilisez un événement d'activation `OnView`.Cela signifie qu'au moment où la vue est utilisée, il doit avoir une connexion active.

```json
"views": {
  "explorer": [{
    "id": "yourIbmiView",
    "name": "My custom View",
    "contextualTitle": "Extension name",
    "when": "code-for-ibmi:connected == true"
  }]
}
```

```json
"activationEvents": [
    "onView:yourIbmiView"
]
```

```js
const { instance } = vscode.extensions.getExtension(`halcyontechltd.code-for-ibmi`);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  const connection = instance.getConnection();
  if (connection) {
    // do initial work
  }
}
```