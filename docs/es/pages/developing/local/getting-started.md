# Desarrollo Local y Implementación en IBM i en Visual Studio Code

Es posible para el usuario desarrollar en una carpeta de espacio de trabajo local y realizar la implementación y compilación en IBM i.

Si el usuario abre un espacio de trabajo antes de conectarse a un IBM i:

1. Un nuevo mensaje de información mostrará al usuario cuál es su biblioteca actual.
2. Si es la primera vez que se conecta con este espacio de trabajo, 
   * solicitará al usuario que establezca un directorio de implementación predeterminado,
   * si no se encuentra un archivo `actions.json`, preguntará al usuario si desea crear uno por defecto.
3. Aparecerá una nueva opción en el menú contextual para implementar en ese directorio.
4. Aparecerá un botón 'Implementar' en la barra de estado.

## Guías

* Esta guía paso a paso está disponible [en el libro rpg-git](https://worksofliam.github.io/rpg-git-book/7-tooling-vscode.html).
* Un [tutorial en video en YouTube](https://www.youtube.com/watch?v=XuiGyWptgDA&t=425s), que muestra la configuración desde cero.
* Fácil clonar desde [Azure DevOps](azure.md).

## 1. Abrir una Carpeta de Espacio de Trabajo

Abrir una carpeta en Visual Studio Code agrega esa carpeta a ese Espacio de Trabajo. Necesitas tener al menos una carpeta abierta en el espacio de trabajo de Visual Studio Code para el desarrollo local.

## 2. Establecer la ubicación de implementación

Si es la primera vez que se conecta con el espacio de trabajo, solicitará al usuario que establezca un directorio de implementación predeterminado.

![](../../../../assets/local_1.png)

Si prefiere cambiar la ubicación predeterminada, el usuario puede hacer clic derecho en cualquier directorio en el Explorador del Sistema de Archivos IFS y seleccionar la opción 'Implementar espacio de trabajo en la ubicación'.

El usuario puede cambiar el directorio de implementación en cualquier momento utilizando la misma opción de clic derecho en otro directorio.

## 3. El botón de Implementar / Ejecutar el proceso de implementación

Usar el botón 'Implementar' en la barra de estado iniciará el proceso de implementación. Si el espacio de trabajo tiene más de una carpeta, el usuario deberá seleccionar qué carpeta desea implementar.

Hay tres opciones para la implementación:

1. Cambios en Trabajo: Esto solo funciona si la carpeta de espacio de trabajo elegida es un repositorio git. Code for IBM i examinará el estado de git para determinar los archivos que han cambiado desde el último commit (sin confirmar y confirmados) y solo cargará esos archivos.
2. Cambios Etapados: Lo mismo que la opción "Cambios en Trabajo", pero solo carga archivos etapados/indexados.
3. Todos: Cargará todos los archivos en la carpeta de espacio de trabajo elegida. Ignorará los archivos que forman parte del archivo '.gitignore' si existe.

El usuario también puede definir Acciones que son del tipo 'file' (local) para ejecutar la implementación antes de ejecutar la Acción.

## 4. Acciones del Espacio de Trabajo (implementar y compilar)

<!-- Gran parte de este texto proviene del archivo variables.md -->

Similar a otras configuraciones de repositorio, los usuarios ahora pueden almacenar Acciones como parte del Espacio de Trabajo. Los usuarios ahora pueden crear `.vscode/actions.json` dentro de su Espacio de Trabajo y puede contener Acciones específicas para ese Espacio de Trabajo. Ese archivo de configuración también debería incluirse en git para esa aplicación.

<!-- panels:start -->

<!-- div:left-panel -->

Hay una herramienta que puede generar un archivo `actions.json` inicial para usted. Después de conectarse a un sistema, abra la paleta de comandos (F1) y busque 'Lanzar Configuración de Acciones'. Esto mostrará una ventana de selección múltiple donde el usuario puede elegir qué tecnologías está utilizando. Según la selección, se creará un `actions.json`.

<!-- div:right-panel -->

![](../../../../assets/actions_tool.png)

<!-- panels:end -->

---

Aquí hay un ejemplo de configuración de `actions.json`, que requiere que la implementación ocurra antes de activar BoB. VS Code mostrará sugerencias de contenido al trabajar con `actions.json`. Podría reemplazar BoB con cualquier sistema de compilación aquí (por ejemplo, make, o quizás una herramienta específica del proveedor).

```json
[
  {
    "name": "Deploy & build with ibmi-bob 🔨",
    "command": "error=*EVENTF lib1=&CURLIB makei -f &BASENAME",
    "extensions": [
      "GLOBAL"
    ],
    "environment": "pase",
    "deployFirst": true
  },
  {
    "name": "Deploy & build with GNU Make 🔨",
    "command": "/QOpenSys/pkgs/bin/gmake &BASENAME BIN_LIB=&CURLIB",
    "extensions": [
      "GLOBAL"
    ],
    "environment": "pase",
    "deployFirst": true
  }
]
```

Ahora, cuando el usuario ejecuta una Acción contra el archivo local (con `Control/Command + E`), aparecerán en la lista.

![imagen](https://user-images.githubusercontent.com/3708366/146957104-4a26b4ba-c675-4a40-bb51-f77ea964ecf5.png)
