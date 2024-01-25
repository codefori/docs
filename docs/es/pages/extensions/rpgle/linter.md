# Configuración del Linter

La información a continuación es específica del linter en la extensión RPGLE.

## Abrir la configuración del linter

Utiliza `vscode-rpgle.openLintConfig` para abrir la configuración de reglas para el fuente en el que estás trabajando.

![Comando para Abrir la Configuración del Lint](../../../assets/rpgle/OpenLintConfig.png)

O también puedes hacer clic derecho en un filtro de biblioteca:

![Abrir Configuración del Lint con un Clic](../../../assets/rpgle/OpenLintConfig_02.png)

Si no existe un archivo de reglas del linter, se te preguntará si deseas crear uno. El archivo creado proporcionará algunas reglas predeterminadas, como se muestra a continuación.

## Configuración relativa del linter

* Si estás desarrollando en miembros fuente (`LIB/QRPGLESRC/MYSOURCE.RPGLE`)
   * la configuración del linter existe en `LIB/VSCODE/RPGLINT.JSON`. 
   * Cada biblioteca tiene su propio archivo de configuración de reglas, vinculándolo a todos los fuentes RPGLE en esa biblioteca. 
   * los cambios de configuración se aplican cuando se vuelven a abrir los fuentes RPGLE.
* Al desarrollar en el IFS:
   * la configuración de reglas del linter existe en `.vscode/rpglint.json` en relación con el directorio de trabajo actual.
   * los cambios de configuración se aplican cuando se vuelven a abrir los fuentes RPGLE.
* Al desarrollar en un espacio de trabajo local
   * las reglas del linter existen en `.vscode/rpglint.json` en relación con el espacio de trabajo.
   * los RPGLE locales se escanean automáticamente cuando la configuración cambia.

## Opciones del Lint

A continuación, se presentan algunas configuraciones de linter disponibles. [Consulta el esquema `rpglint.json` para las reglas más actualizadas](https://github.com/halcyon-tech/vscode-rpgle/blob/main/schemas/rpglint.json).

| Tipo | Regla | Valor | Descripción |
|---|---|---|---|
| 🌟 | indent | número | Sangría para RPGLE. |
| 🌟 | BlankStructNamesCheck | booleano | Los nombres de estructuras no pueden estar en blanco (*N). |
| 🌟 | QualifiedCheck | booleano | Los nombres de estructuras deben estar calificados (QUALIFIED). |
| 🌟 | PrototypeCheck | booleano | Los prototipos solo pueden definirse con EXT, EXTPGM o EXTPROC. |
| 🌟 | ForceOptionalParens | booleano | Las expresiones deben estar rodeadas por corchetes. |
| 🌟 | NoOCCURS | booleano | OCCURS no está permitido. |
| 🤔 | NoSELECTAll | booleano | 'SELECT *' no está permitido en SQL incorporado. |
| 🌟 | UselessOperationCheck | booleano | No se permiten códigos de operación redundantes (EVAL, CALLP). |
| 🌟 | UppercaseConstants | booleano | Las constantes deben estar en mayúsculas. |
| 🌟 | IncorrectVariableCase | booleano | Los nombres de variables deben coincidir con el caso de la definición. |
| 🌟 | RequiresParameter | booleano | Se deben usar paréntesis en una llamada a procedimiento, incluso si no tiene parámetros. |
| 🌟 | RequiresProcedureDescription | booleano | Se deben proporcionar títulos y descripciones de procedimientos. |
| 🌟 | StringLiteralDupe | booleano | No se permiten literales de cadena duplicados. |
| 🌟 | RequireBlankSpecial | booleano | *BLANK debe usarse en lugar de literales de cadena vacíos. |
| 🌟 | CopybookDirective | cadena | Fuerza la directiva que se debe usar para incluir otro fuente (`COPY` o `INCLUDE`). |
| 🌟 | UppercaseDirectives | booleano | Las directivas deben estar en mayúsculas. |
| 🤔 | NoSQLJoins | booleano | No se permiten JOINs en SQL incorporado. |
| 🌟 | NoGlobalsInProcedures | booleano | No se permiten globales en procedimientos. |
| 🌟 | SpecificCasing | array | Casing específico para códigos de operación, declaraciones o códigos de funciones integradas. |
| 🌟 | NoCTDATA | booleano | No se permite CTDATA. |
| 🌟 | PrettyComments | booleano | Los comentarios no pueden estar en blanco, deben comenzar con un espacio y tener una correcta sangría. |
| 🌟 | NoGlobalSubroutines | booleano | No se permiten subrutinas globales. |
| 🌟 | NoLocalSubroutines | booleano | No se permiten subrutinas en procedimientos. |
| 🌟 | NoUnreferenced | booleano | No se permiten definiciones no referenciadas. |
| 🔒 | NoExternalTo | array de cadenas | No se permiten llamadas a ciertas API (EXTPROC / EXTPGM). |
| 🔒 | NoExecuteImmediate | booleano | No se permiten declaraciones SQL incorporadas con EXECUTE IMMEDIATE. |
| 🔒 | NoExtProgramVariable | booleano | No se permite declarar un prototipo con EXTPGM y EXTPROC usando un procedimiento. |
| 🤔🌟 | IncludeMustBeRelative | booleano | Al usar declaraciones copy o include, la ruta debe ser relativa a la raíz. Se recomienda su uso solo para proyectos locales/espaciales de trabajo. |
| 🤔 | SQLHostVarCheck | booleano | Advierte cuando se hacen referencia a variables en SQL incorporado que también están definidas localmente. | 
| 🤔 | RequireOtherBlock | booleano | Requiere que los bloques `SELECT` tengan un bloque `OTHER`. |

**Clave de tipo**

| Clave | Valor |
|---|---|
| 🌟 | Código limpio |
| 🤔 | Código seguro |
| 🔒 | Código seguro |

### Ejemplo de `SpecificCasing`

Esta regla te permite especificar el formato requerido para cualquier o todas las declaraciones o BIFs.

Si deseas que todas las `DCL` estén en minúsculas y todas las `BIF`s estén en mayúsculas, se codificaría así:


```json
   "SpecificCasing": [
      {
         "operation": "%parms",
         "expected": "*lower"
      },
      {
         "operation": "%timestamp",
         "expected": "*TimeStamp"
      },
      {
         "operation": "*bif",
         "expected": "*upper"
      }
   ]
```