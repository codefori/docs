Proporcionamos algunos valores de contexto y variables de entorno para que las extensiones y entornos gestionados puedan controlar Code for IBM i.

| Tipo                | Nombre                                      | Valores      | Comentario                                                    |
| ------------------- | ------------------------------------------- | ------------ | -------------------------------------------------------------- |
| Valor de contexto   | `code-for-ibmi:libraryListDisabled`         | booleano     |                                                                |
| Valor de contexto   | `code-for-ibmi:connectionBrowserDisabled`   | booleano     |                                                                |
| Valor de contexto   | `code-for-ibmi:helpViewDisabled`            | booleano     |                                                                |
| Valor de contexto   | `code-for-ibmi:objectBrowserDisabled`       | booleano     |                                                                |
| Valor de contexto   | `code-for-ibmi:ifsBrowserDisabled`          | booleano     |                                                                |
| Variable de entorno | `DEBUG_CA_PATH`                             | ruta de cadena | PR pendiente, solo se usa cuando `DEBUG_MANAGED` es true        |
| Variable de entorno | `DB2I_DISABLE_CA`                           | booleano     | Específico de la extensión Db2 for i para deshabilitar la asistencia de contenido |

## Variables de entorno de Sandbox

Cuando se establecen estas variables, Code for IBM i se conectará automáticamente utilizando estas variables de entorno.

| Nombre            | Valores |
| ----------------- | ------ |
| `SANDBOX_SERVER`  | cadena  |
| `SANDBOX_USER`    | cadena  |
| `SANDBOX_PASS`    | cadena  |
