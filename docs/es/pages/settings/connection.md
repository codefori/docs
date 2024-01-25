# Conexiones Múltiples

Se pueden definir múltiples conexiones y algunas configuraciones son específicas de una conexión y se pueden guardar para la conexión y luego recargarlas más tarde.

### Biblioteca Actual

La biblioteca que se establecerá como la biblioteca actual durante la compilación.

Puedes cambiar la biblioteca actual con el comando 'Cambiar biblioteca de compilación' (F1 -> Cambiar biblioteca de compilación).

### Directorio de Inicio

Directorio de inicio para el usuario. Este directorio también es la raíz para el navegador de IFS.

### Biblioteca Temporal

Biblioteca temporal. Almacena objetos temporales utilizados por Code for i. Se creará automáticamente si no existe. No puede ser QTEMP. El valor predeterminado es `ILEDITOR`.

> [!ATENCIÓN]
> Si tu IBM i utiliza software de replicación, no es necesario replicar la biblioteca temporal. Tu administrador del sistema puede agregarla a la lista de objetos que se deben ignorar.

### Directorio Temporal de IFS

Directorio temporal de IFS. Almacena archivos temporales de IFS utilizados por Code for i. Se creará automáticamente si no existe. Debe estar en el sistema de archivos root o QOpenSys. El valor predeterminado es `/tmp`.

> [!ATENCIÓN]
> Si tu IBM i utiliza software de replicación, no es necesario replicar el directorio temporal. Tu administrador del sistema puede agregarlo a la lista de rutas que se deben ignorar.
Es seguro tener archivos creados por Code for i eliminados automáticamente durante el mantenimiento o IPL.

### ASP de Fuente

Si los archivos fuente están ubicados en un ASP específico, especifica aquí.
De lo contrario, déjalo en blanco.

### Habilitar Fechas de Fuente

Cuando está marcado, se retendrán las fechas de fuente.

### Fechas de Fuente en el Margen

Cuando está marcado, las fechas de fuente se mostrarán en el margen.
