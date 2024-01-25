Al igual que con otras configuraciones de repositorios, los usuarios ahora pueden almacenar Acciones como parte del Workspace. Ahora pueden crear un archivo `.vscode/actions.json` dentro de su Workspace, el cual puede contener Acciones específicas para ese Workspace. Este archivo de configuración también debe incluirse en Git para esa aplicación.

Al ejecutar Acciones locales, se ejecutarán los comandos con el directorio de trabajo como directorio de implementación.

Hay una herramienta que puede generar un archivo `actions.json` inicial para ti. Después de conectarte a un sistema, abre la paleta de comandos (F1) y busca 'Launch Actions Setup'. Esto mostrará una ventana de selección múltiple donde el usuario puede elegir las tecnologías que está utilizando. Según la selección, se creará un archivo `actions.json`.

## Variables Disponibles

Estas variables se pueden utilizar para el desarrollo local. Se pueden hacer referencias a ellas en `actions.json` o `.env`.

### Bibliotecas

| Variable        | Descripción                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `&BUILDLIB`     | Igual que `&CURLIB`                                                             |
| `&CURLIB`       | La biblioteca actual definida en la vista de Lista de Bibliotecas del Usuario. También se puede usar `*CURLIB` |
| `&LIBLS`        | La lista de bibliotecas con espacios entre cada elemento                                    |
| `&BRANCHLIB`    | Un nombre de biblioteca determinista construido a partir de la rama actual en git                 |

### Directorios y Archivos

| Variable        | Descripción                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `&RELATIVEPATH` | La ruta relativa al archivo en el espacio de trabajo                                    |
| `&LOCALPATH`    | La ruta completa al archivo en la máquina local                                    |
| `&FULLPATH`     | La ruta completa al archivo en la máquina remota                                   |
| `&WORKDIR`      | El directorio de trabajo. Normalmente significa el directorio de implementación                  |
| `&PARENT`       | El directorio principal local                                                        |
| `&BASENAME`     | El nombre base del archivo (`nombre.ext`). También se puede usar `{filename}`                  |
| `&NAME`         | El nombre del archivo (o usa `&NAMEL` para minúsculas)                              |
| `&EXT`          | La extensión del archivo (o usa `&EXTL` para minúsculas)                          |

### Otros

| Variable        | Descripción                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `&USERNAME`     | Nombre de usuario conectado. También se puede usar `{usrprf}`                                       |
| `&HOST`         | Nombre de host conectado. También se puede usar `{host}`                                         |
| `&HOME`         | Directorio de inicio actual. Normalmente no es el mismo que el directorio de implementación.               |
| `&BRANCH`       | El nombre actual de la rama en git. También se puede usar `{branch}`                           |

## Variables de entorno PASE

Cuando ejecutas Acciones en el entorno PASE, todas las variables de VS Code (cosas como `&CURLIB`, `&BUILDLIB`, variables personalizadas, variables de `.env`) se heredan al shell PASE creado.

<!-- paneles:comienzo -->

<!-- div:panel-izquierdo -->

Por ejemplo, supongamos que tenemos este script de shell y esta Acción:

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
<!-- div:panel-derecho -->

Verás la salida:

```
Current library: USERLIB
Library list: QDEVTOOLS SAMPLE
Commands:
		chmod +x ./myscript.sh && ./myscript.sh

Welcome
The current library is USERLIB
```

<!-- panels:end -->

## Archivo de entorno

Además de las variables personalizadas definidas en la vista de Lista de Bibliotecas del Usuario, los usuarios también pueden hacer uso del archivo `.env`.

El archivo `.env` permite a cada desarrollador definir su propia configuración. Por ejemplo, la práctica estándar de desarrollo con Git es que cada desarrollador trabaje en su propio entorno, por lo que los desarrolladores pueden construir en sus propias bibliotecas. El archivo `.env` siempre debe estar en el archivo `.gitignore`.

Las variables definidas en este archivo sobrescribirán cualquier variable predeterminada proporcionada.

<!-- panels:start -->

<!-- div:left-panel -->

### `actions.json`

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

<!-- div:right-panel -->

### Archivos `.env` Específicos del Desarrollador


```sh
# developer A:
DEVLIB=DEVALIB
```

```sh
# developer B:
DEVLIB=DEVBLIB
```

<!-- panels:end -->

### Biblioteca de Rama

`&BRANCHLIB` es una variable especial para generar un nombre de biblioteca basado en el nombre de la rama. La herramienta Source Orbit también admite esta lógica de nombre de biblioteca de rama.

La variable `&BRANCHLIB` siempre comenzará con `VS`, seguido por un conjunto determinista de 8 caracteres basados en el nombre actual de la rama.

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