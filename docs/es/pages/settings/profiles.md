# Perfiles de Conexión

Un Perfil de Conexión permite al usuario cambiar entre configuraciones rápidamente. Puedes usar un perfil para cambiar rápidamente la lista de bibliotecas y otros elementos específicos de un proyecto. Un perfil almacena la siguiente información:

- El directorio de inicio / de trabajo
- La biblioteca actual
- La lista de bibliotecas
- Los accesos directos de IFS
- La lista del navegador de objetos
- La lista del navegador de bases de datos

Si no tienes perfiles existentes, puedes crear tu primero desde la vista de Lista de Bibliotecas del Usuario:

![Guardar Perfil](../../../assets/Connect_Profile_Save_01.png)

Después de haber creado tu primer perfil, estará disponible la vista de Perfiles. La vista de Perfiles te permite cambiar rápidamente entre perfiles, así como actualizar y eliminar perfiles existentes. La vista de Perfiles también te mostrará cuál fue el último perfil que configuraste.

En la vista de perfiles, el botón de guardar en la barra de encabezado pedirá al usuario que guarde en un perfil completamente nuevo. Puedes hacer clic derecho en un perfil y guardar para actualizar un perfil.

**Cambiar cualquiera de las configuraciones** no actualizará el perfil. Si cambias la lista de bibliotecas y quieres que esto se refleje en el perfil, puedes guardar sobre el perfil existente o en uno nuevo.

## Perfiles de Comando

Los Perfiles de Comando son tipos especiales de perfiles que solo actualizan la lista de bibliotecas del usuario y la biblioteca actual. Los Perfiles de Comando se crean a partir de comandos ILE/CL que establecen la lista de bibliotecas y/o la biblioteca actual.

Al crear un Perfil de Comando, se proporciona un comando ILE/CL que configuraría la lista de bibliotecas del usuario y la biblioteca actual para un trabajo. Esto es especialmente útil al trabajar con cambios en la gestión que tienen comandos para configurar el entorno del usuario.

Puedes cambiar entre Perfiles de Comando y Perfiles de Conexión tan a menudo como desees.

![Guardar Perfil](../../../assets/command_profile.png)

Los Perfiles de Comando solo se pueden crear después de haber creado el primer Perfil de Conexión.
