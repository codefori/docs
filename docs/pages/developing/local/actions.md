Similar to other repository settings, users can now store Actions as part of the Workspace. Users can now create `.vscode/actions.json` inside of your Workspace, and can contain Actions that are specific to that Workspace. That configuration file should also be checked into git for that application.

There is a tool that can generate an initial `actions.json` file for you. After connecting to a system, open the command palette (F1) and search for 'Launch Actions Setup'. This shows a multi-select window where the user can pick which technologies they're using. Based on the selection, an `actions.json` will be created.

## PASE environment variables

When you run Actions in the pase environment, all variables from VS Code (things like `&CURLIB`, `&BUILDLIB`, custom variables, `.env` variables) are inherited into the spawned pase shell.

For example, let's say we had this shell script and this Action:

```sh
echo "Welcome"
echo "The current library is $CURLIB"
```

```json
  {
    "name": "Run my shell script",
    "command": "chmod +x ./myscript.sh && ./myscript.sh",
    "extensions": [
      "GLOBAL"
    ],
    "environment": "pase",
    "deployFirst": true
  }
```

You will see the output:

```
Current library: USERLIB
Library list: QDEVTOOLS SAMPLE
Commands:
		chmod +x ./myscript.sh && ./myscript.sh

Welcome
The current library is USERLIB
```

## Environment file

As well as custom variables defined in the User Library List view, users can also make use of the `.env` file.

The `.env` file allows each developer to define their own configuration. For example, standard development practice with git is everyone developing in their own environment - so developers might build into their own libraries. The `.env` file should always be in the `.gitignore` file.

```sh
# developer A:
DEVLIB=DEVALIB
```

```sh
# developer B:
DEVLIB=DEVBLIB
```

```jsonc
// actions.json
[
 {
   "name": "Deploy & build with ibmi-bob 🔨",
   "command": "error=*EVENTF lib1=&DEVLIB makei -f &BASENAME",
   "extensions": [
     "GLOBAL"
   ],
   "environment": "pase",
   "deployFirst": true
 }
]
```

### Branch library

`&BRANCHLIB` is a special variable for generating a library name based on the branch name. The Source Orbit tool also supports this same branch library name logic.

The `&BRANCHLIB` variable will always start with `VS` followed by a deterministic set of 8 characters based on the current branch name.

```jsonc
// actions.json
[
 {
   "name": "Deploy & build with ibmi-bob 🔨",
   "command": "error=*EVENTF lib1=&BRANCHLIB makei -f &BASENAME",
   "extensions": [
     "GLOBAL"
   ],
   "environment": "pase",
   "deployFirst": true
 }
]
```