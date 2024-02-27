Es posible escribir extensiones de VS Code basadas en Code for IBM i. Esto significa que tu extensión puede utilizar la conexión que el usuario crea en tu extensión. Esto no es un tutorial de extensiones, sino una introducción sobre cómo acceder a las API disponibles dentro de Code for IBM i.

Por ejemplo, podrías ser un proveedor que produce listas o HTML que te gustaría que estén accesibles desde Visual Studio Code.

# Exportaciones

Además del API básico de comandos de VS Code, puedes acceder al API de Code for IBM i con el API `getExtension` de VS Code.


```
const { instance } = vscode.extensions.getExtension(`halcyontechltd.code-for-ibmi`).exports;
```
## Tipos

Proporcionamos definiciones de tipos en TypeScript para facilitar el uso de la API de Code for IBM i. Pueden ser instalados mediante `npm`:


```terminal
npm i @halcyontech/vscode-ibmi-types
```

Luego se puede importar y utilizar en combinación con `getExtension`:

```ts
import type { CodeForIBMi } from '@halcyontech/vscode-ibmi-types';

//...

const ext = vscode.extensions.getExtension<CodeForIBMi>('halcyontechltd.code-for-ibmi');
```
> [!ATTENTION]
> A medida que Code for IBM i se actualiza, es posible que la API cambie. Se recomienda mantener siempre actualizados los tipos empaquetados a medida que se actualiza la extensión, en caso de que cambien las interfaces de la API. Planeamos estabilizar las interfaces de la API de comandos de VS Code para que no se rompan tan a menudo después de su lanzamiento.

## Ejemplo de importación

Este ejemplo se puede utilizar como una forma sencilla de acceder a la instancia de Code for IBM i.


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
## Escucha de eventos

La API de Code for IBM i proporciona un escucha de eventos. Esto permite que tu extensión dispare un evento cuando sucede algo en Code for IBM i.


```js
const instance = getInstance();

instance.onEvent(`connected`, () => {
  console.log(`It connected!`);
});
```

### Eventos disponibles

| ID          | Evento                                          |
|-------------|-------------------------------------------------|
| `connected` | Cuando Code for IBM i se conecta a un sistema   |
| `disconnected` | Cuando Code for IBM i se desconecta de un sistema |
| `deployLocation` | Cuando cambia la ubicación de implementación |
| `deploy` | Cuando se completa exitosamente una implementación |

# APIs

## Ejecutar comandos con la lista de bibliotecas del usuario

Code for IBM i proporciona una API (a través de un comando de VS Code) que puede ser utilizada por una extensión para ejecutar un comando remoto en IBM i.

Tiene un parámetro que es un objeto con algunas propiedades:


```ts
interface CommandInfo {
  /** describes what environment the command will be executed. Is optional and defaults to `ile` */
  environment?: `pase`|`ile`|`qsh`;
  /** set this as the working directory for the command when it is executed. Is optional and defaults to the users working directory in Code for IBM i. */
  cwd?: string;
  command: string;
}
```

- El comando también puede utilizar [campos con posibilidad de ingresar datos](https://halcyon-tech.github.io/vscode-ibmi/#/?id=prompted).
- Cuando ejecutas un comando en el entorno `ILE` o `QSH`, utilizará la lista de bibliotecas de la conexión actual.

El comando devuelve un objeto:


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
También puedes proporcionar una lista de bibliotecas personalizada y la biblioteca actual al ejecutar un comando en el entorno `ILE`:

```js
const detail: CommandResult = {
  environment: `ile`,
  command: `CRTBNDRPG...`,
  env: {
    // Space delimited library list
    '&LIBL': 'LIBA LIBB LIBC'
    '&CURLIB': 'LIBD'
  }
}
```

## Ejecución de consultas SQL

Code for IBM i tiene un comando que te permite ejecutar declaraciones SQL y obtener un resultado.


```ts
const instance = getInstance();

const rows = await instance.getContent().runSQL(`select * from schema.yourtable`);
```

## Obtener miembros y archivos de flujo

Es posible para las extensiones utilizar los sistemas de archivos proporcionados por Code for IBM i.

`openTextDocument` devuelve un [`TextDocument`](https://code.visualstudio.com/api/references/vscode-api#TextDocument).

#### Obteniendo un miembro


```js
//Member located on *SYSBAS
const doc = await vscode.workspace.openTextDocument(vscode.Uri.from({
  scheme: `member`,
  path: `/${library}/${file}/${name}.${extension}`
}));

//Member located on an iASP
const doc = await vscode.workspace.openTextDocument(vscode.Uri.from({
  scheme: `member`,
  path: `/${iasp}/${library}/${file}/${name}.${extension}`,
  query: 'readonly=true' //Optional: open in read-only mode
}));
```

#### Obteniendo un archivo de flujo
```js
const doc = await vscode.workspace.openTextDocument(vscode.Uri.from({
  scheme: `streamfile`,
  path: streamfilePath,
  query: 'readonly=true' //Optional: open in read-only mode
}));
```
#### Opciones del sistema de archivos
Tanto los sistemas de archivos `member` como `streamfile` admiten los siguientes parámetros de consulta:

| Nombre      | Tipo      | Descripción                                                  |
|-------------|-----------|--------------------------------------------------------------|
| `readonly`  | `boolean` | Abre el editor de texto en modo de solo lectura. Por defecto, es `false`. |


## Conectarse a un sistema

Es posible que tu API automatice la conexión a un sistema IBM i en lugar de que el usuario utilice la vista de conexión.


```ts
const connectionData: ConnectionData = {...};

const connected: boolean = await vscode.commands.executeCommand(`code-for-ibmi.connectDirect`, connectionData);

if (connected) {
  // do a thing.
} else {
  // something went wrong.
}
```

# Integración con VS Code

## Opciones del menú contextual (clic derecho)

Es posible que tu extensión añada opciones al menú contextual (clic derecho) para:

- objetos en el Explorador de Objetos
- miembros en el Explorador de Objetos
- directorios en el Explorador de Sistemas de Archivos (IFS)
- archivos de flujo en el Explorador de Sistemas de Archivos (IFS)
- y mucho más

Registrarías un comando como normalmente esperarías, pero espera un parámetro para el nodo elegido desde la vista de árbol. Aquí tienes un ejemplo para eliminar un archivo de flujo en el Explorador de Sistemas de Archivos (IFS).

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

Después de eso, necesitamos registrar el comando para que tenga una etiqueta. Hacemos esto en `package.json`

```json
{
  "command": "code-for-ibmi.deleteIFS",
  "title": "Delete object",
  "category": "Your extension"
}
```

Finalmente, lo agregamos a un menú contextual:

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

**Al agregar tu comando a un contexto de menú**, hay muchas posibles valores para tu cláusula `when`:

- `view` puede ser `ifsBrowser` o `objectBrowser`.
- `viewItem` puede ser diferente dependiendo de la vista:
  - para `ifsBrowser`, puede ser `directory` o `streamfile`.
  - para `objectBrowser`, puede ser `member` (miembro fuente), `object` (cualquier objeto), `SPF` (archivo fuente) o `filter`.

Esto permite que tu extensión proporcione comandos para tipos específicos de objetos o elementos específicos en el árbol de vista.

[Lee más sobre la cláusula when en el sitio web de la documentación de VS Code.](https://code.visualstudio.com/api/references/when-clause-contexts)

## Vistas

Code for IBM i proporciona un contexto para que puedas controlar cuándo puede funcionar un comando, vista, etc. `code-for-ibmi.connected` se puede y debe usar si tu vista depende de una conexión. Por ejemplo,

Esto mostrará una vista de bienvenida cuando no haya conexión:


```json
		"viewsWelcome": [{
			"view": "git-client-ibmi.commits",
			"contents": "No connection found. Please connect to an IBM i.",
			"when": "code-for-ibmi:connected !== true"
		}],
```

Esto mostrará una vista cuando haya una conexión:

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

# Preguntas frecuentes (FAQ)

## Obtener la biblioteca temporal

Recuerda que no puedes utilizar `QTEMP` entre comandos, ya que cada comando se ejecuta en un nuevo trabajo. Consulta `instance.getConfig().tempLibrary` para obtener la biblioteca temporal del usuario.

## ¿Existe una conexión?

Puedes utilizar `instance.getConnection()` para determinar si hay una conexión:


```ts
async getChildren(element) {
  const connection = instance.getConnection();

  let items: TreeItem[] = [];

  if (connection) {
    //Do work here...

  } else {
    items = [new vscode.TreeItem(`Please connect to an IBM i and refresh.`)];
  }

  return items;
}
```
## Contexto `connected`

Si te refieres a la sección **Vistas**, puedes configurar la vista para que solo se muestre cuando estás conectado. Esto significa que, cuando se utiliza la vista, debería existir una conexión.

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

## Ejemplos

Consulta los siguientes repositorios de código para obtener ejemplos extensos de extensiones que utilizan Code for IBM i:

* [Extensión de VS Code para gestionar servicios IWS en IBM i](https://github.com/halcyon-tech/vscode-ibmi-iws)
* [Extensión Git para IBM i](https://github.com/halcyon-tech/git-client-ibmi)

# Variable de entorno vscode-ibmi

Proporcionamos variables de entorno para que Code for IBM i pueda ser controlado por entornos gestionados. Consulta [Variables](./variables.md).
