# RPGLE: Extensión para Visual Studio Code

![Logo](https://github.com/halcyon-tech/vscode-rpgle/blob/main/media/logo.png?raw=true)

RPGLE es un lenguaje tipado diseñado específicamente para ejecutarse en IBM i. Se utiliza principalmente para transacciones comerciales, procesamiento de grandes cantidades de datos, entrada de datos y APIs web.

Echa un vistazo a [este video de YouTube del canal Visual Studio Code](https://www.youtube.com/watch?v=JRI7K8Y7cjQ) sobre IBM i y RPGLE.

## Instalación

La extensión se puede [instalar desde el Marketplace](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.vscode-rpgle) y también forma parte del [IBM i Development Pack](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.ibm-i-development-pack).

Los compiladores oficiales para RPGLE solo se pueden ejecutar en IBM i y no son necesarios para la funcionalidad de este lenguaje. Si eres usuario de IBM i, la extensión Code for IBM i ofrece la funcionalidad para compilar el código fuente en el espacio de trabajo local.

## Uso

La extensión tiene dos funcionalidades principales:

- Herramientas de lenguaje: asistencia de contenido, vista de esquema, etc. Admite todas las versiones de ILE RPG (formato fijo, mixto y de formato libre).
- Linter: linter configurable para verificar la calidad del código. **Solo admite formato libre total** (`**FREE`).

La extensión de lenguaje RPGLE funciona en tres sistemas de archivos principales:

- Espacio de trabajo local
- Miembros de fuente de IBM i (remoto)
- Streamfiles de IBM i (remoto)

## Hola Mundo

Para asegurarte de que la extensión RPGLE está funcionando, podemos escribir el código fuente de un programa muy simple en nuestro espacio de trabajo local.

Crea una carpeta llamada `HelloWorld` y abre VS Code en esa carpeta (`code .` abre VS Code en la carpeta actual):

```terminal
mkdir HelloWorld
cd HelloWorld
code .
```

TEl comando "code ." abre Visual Studio Code en la carpeta de trabajo actual, que se convierte en tu "espacio de trabajo". Acepta el diálogo de Confianza del Espacio de Trabajo seleccionando **Sí, confío en los autores** ya que esta es una carpeta que creaste.

Ahora crea un archivo nuevo llamado `helloworld.pgm.rpgle` con el botón **Nuevo Archivo** en el Explorador de Archivos o con el comando **Archivo** > **Nuevo Archivo**.

![](../../../assets/rpgle/hw_1.png)
![](../../../assets/rpgle/hw_2.png)

### Agregar código fuente de Hello World

Ahora pega este código fuente:

```rpgle
**free

ctl-opt dftactgrp(*no);

dcl-s mytext char(25);

Dcl-PR printf Int(10) extproc('printf');
  input Pointer value options(*string);
End-PR;

mytext = 'Hello World';
printf(mytext);

return;
```

### Verificar con la Vista de Contornos

Puedes enfocar la Vista de Contornos abriendo la Paleta de Comandos (**F1**) y buscando 'focus outline'. Las definiciones del programa deberían mostrarse:

![](../../../assets/rpgle/hw_3.png)

### ¿Y ahora qué?

Compilar el código desde Visual Studio Code requiere una extensión diferente debido a que los compiladores solo existen en IBM i. Consulta la [documentación oficial de Code for IBM i](https://halcyon-tech.github.io/docs/#/) para empezar.

## Asistencia de Contenido

La asistencia de contenido proporciona autocompletado de código, información al pasar el cursor y problemas de formato para ayudar al usuario a escribir código correctamente.

![](../../../assets/rpgle/intellisense.png)

Puedes desactivar la asistencia de contenido para que no aparezca automáticamente cambiando la configuración 'Suggest On Trigger Characters'.

### Información al Pasar el Cursor

Pasa el cursor sobre cualquier definición (variable, estructura, procedimientos, etc.) para ver información sobre el tipo y la documentación.

![](../../../assets/rpgle/hover.png)

## Navegación de Código

Ya sea escribiendo código en el espacio de trabajo local o en un IBM i remoto, los usuarios pueden utilizar la funcionalidad de navegación de código incorporada para comprender mejor su aplicación.

### Ir a la definición

Con cualquier definición, puedes utilizar Ir a la Definición o Explorar Definición:

![](../../../assets/rpgle/peek_defs.png)

### Mostrar Referencias

Al igual que con las definiciones, puedes encontrar todas las referencias a las definiciones con Ir a Referencias o Explorar Referencias:

![](../../../assets/rpgle/peef_refs.png)

### Ir a Implementación

Ir a Implementación funciona para procedimientos de dos maneras.

* Para todas las fuentes (miembros/streamfiles/locales) buscará el nombre del procedimiento en los directorios de enlace que hayas especificado en el encabezado/control-spec `BNDDIR` e intentará abrir la fuente correspondiente.
   * La búsqueda utiliza la lista de bibliotecas de Code for IBM i si el directorio de enlace no está calificado con una biblioteca.
* Para proyectos locales, te llevará a la implementación de un procedimiento de exportación donde sea que esté en tu proyecto.

### Formatear Documento

Puedes corregir automáticamente toda la sangría de tus fuentes de formato libre utilizando Formatear Documento dentro de VS Code.

*Abre la Paleta de Comandos (F1/Control+Shift+P) -> 'Format Document'*

### Extraer a Nuevo Procedimiento

Cuando usas código fuente completamente de formato libre, puedes utilizar 'Extraer a procedimiento' que tomará las líneas de código seleccionadas y las envolverá en un nuevo procedimiento y convertirá todas las variables referenciadas en parámetros.

![](../../../assets/rpgle/extract_procedure.png)

## Linter

La extensión incluye un linter incorporado para garantizar que los desarrolladores escriban el código más limpio posible. El linter no tiene opiniones y es altamente configurable.

### Crear Configuración de Lint

Utiliza el comando 'Abrir configuración de lint de RPGLE' desde la paleta de comandos para crear y abrir automáticamente la configuración de lint relativa a la fuente de RPGLE en la que estás trabajando.

![](../../../assets/rpgle/lint_create.png)

### Opciones de Lint

Hay algunas opciones predeterminadas habilitadas cuando se crea la configuración de lint. La asistencia de contenido dentro de `rpglint.json` mostrará otras opciones disponibles:

![](../../../assets/rpgle/lint_options.png)

### Corrección Rápida y Formateo

La mayoría de los errores de lint tienen una Corrección Rápida y las correcciones están disponibles al pasar el cursor sobre el error. También puedes utilizar 'Format Document' desde la paleta de comandos para corregir todos los errores con una Corrección Rápida adjunta.

![](../../../assets/rpgle/lint_errors.png)
