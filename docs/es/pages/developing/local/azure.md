# Clonar un Proyecto desde Azure DevOps con Visual Studio Code y Git

Al utilizar Visual Studio Code y Git, es posible abrir automáticamente el proyecto desde Azure DevOps.

Encuentra el repositorio con el que deseas trabajar en Azure DevOps y presiona el botón "Clone". Asegúrate de que esté seleccionada la opción HTTPS y, antes de continuar, verifica que las credenciales de Git sean visibles, ya que se utilizarán más adelante.

   ![Azure DevOps - Paso 1](../../../../assets/azure-1.png)

Cuando estés listo, copia la contraseña en tu portapapeles y selecciona 'Clone in VS Code'. Esto abrirá VS Code y se asegurará de que el usuario desee realizar esta acción:

   ![Azure DevOps - Paso 2](../../../../assets/azure-2.png)

VS Code te preguntará dónde deseas clonar el repositorio.

   ![Azure DevOps - Paso 3](../../../../assets/azure-3.png)

Cuando la clonación esté completa, te preguntará si deseas abrir la carpeta del repositorio. Seleccionar 'Open' la agregará al Workspace.

Ahora que el código fuente está en tu máquina local, puedes continuar y conectarte a tu sistema de desarrollo. Dado que esta es una carpeta completamente nueva, se te preguntará si deseas establecer el directorio de implementación predeterminado. Se recomienda utilizar el valor predeterminado.

   ![Azure DevOps - Paso 4](../../../../assets/azure-4.png)


Desde aquí, puedes comenzar a desarrollar y compilar. Si es la primera vez, asegúrate de leer la documentación de [Desarrollo Local](getting-started.md) para comprender para qué se utiliza el directorio de implementación y cómo ejecutar comandos de compilación.
