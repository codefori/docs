
# Personnaliser une interface utilisateur dans Code For IBM i

Pour faciliter la création d'interface utilisateur, une commande `CustomUI` qui permet aux utilisateurs de définir les champs d'un formulaire et de gérer sa soumission via une fonction de rappel (callback). 

* Chaque formulaire a besoin d'au moins 1 champ ou bouton de soumission.
* Vous devez `panel.dispose()` dans la fonction de rappel.
* et retourner `{panel, data}`

Vous pouvez trouver le source de cette API à `src/api/CustomUI.js`.

### La commande `code-for-ibmi.launchUI`

Votre extension peut exécuter cette commande comme ce qui suit:

```js
vscode.commands.executeCommand(`code-for-ibmi.launchUI`, `UI Tab`, fields, (result) => {
  const {panel, data} = result;
  if (data) {
    // Button was pressed
    panel.dispose();
  } else {
    // Tab was closed
  }
});
```

### `Field` object

```js
/**
 * {{
 *    id: string,
 *    type: "input"|"password"|"buttons"|"checkbox"|"file"|"tabs"|"tree"|"select"|"paragraph"|"hr",
 *    label: string,
 *    description?: string,
 *    items?: {label: string, value: string}[],                                         // When type == tree
 *    items?: {selected?: boolean, value: string, text: string, description: string}[], // When type == select
 *    items?: {id: string, label: string}[],                                            // When type == buttons,
 *    readonly? boolean // When type == input, allowing a readonly, non editable field.
 * }[]}
 **/
```

## Exemple

### Exemple simple

```js
const vscode = require(`vscode`);

context.subscriptions.push(
  vscode.commands.registerCommand(`your-ext.runMyThing`, async function () {
    const fields = [
      { type: `input`, id: `name`, label: `Your name` },
      { type: `buttons`, items: [{id: `connect`, label: `Connect`}] }
    ];

    vscode.commands.executeCommand(`code-for-ibmi.launchUI`, `IBM i Login`, fields, (result) => {
      const {panel, data} = result;
      if (data) {
        if (data.name.length > 0) {
          panel.dispose(); //Must be called to close the panel!
          vscode.window.showInformationMessage(`Hello ${data.name}!`);
        } else {
          vscode.window.showErrorMessage(`Name cannot be blank.`);
        }
      } else {
        vscode.window.showInformationMessage(`Panel was closed by user.`);
      }
    });
  });
);
```