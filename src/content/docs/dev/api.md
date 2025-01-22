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