# Estructura de Proyecto Recomendada

Esta página describe una estructura de proyecto recomendada cuando se utiliza git con tus fuentes ILE. Code for IBM i y las extensiones subsecuentes seguirán esta estructura para el desarrollo local.

## Nombres de Archivos y 'Texto del Miembro'

Se recomienda que el nombre del origen coincida con el nombre del objeto creado. Por ejemplo:

* `ord500.pgm.rpgle` se convertiría en el objeto `ORD500.PGM`
* `ord500.cmd` se convertiría en el objeto `ORD500.CMD`

Dado que el 'texto del miembro' se asocia tradicionalmente con los miembros, ya no es posible hacerlo con el sistema de archivos jerárquico estándar. Hay dos opciones para asociar 'texto' (la descripción) con un fragmento de código fuente.

### Uso de `%TEXT` en tu código fuente

Puedes usar `%TEXT:` en cualquier comentario en tu código fuente. Esto funciona para cualquier lenguaje de programación que utilices.


```rpgle
**free

// %TEXT: This program is for order entry

dcl-pi ORD500;
end-pi;

//...

return;
```

```sql
-- %TEXT: Order entry table
create or replace table xyz (...);
```

## Uso de la Opción `TEXT` (en RPGLE)

En la especificación H o en el código de operación `CTL-OPT`, puedes utilizar la palabra clave `TEXT` para especificar el texto.


```rpgle
**free

ctl-opt text('This program is for order entry');

dcl-pi ORD500;
end-pi;

//...

return;
```
## Nombres de archivos en minúsculas

Se recomienda utilizar siempre nombres de archivos en minúsculas. Generalmente, es más fácil para la lectura y sigue el estándar de la mayoría de los entornos. También puedes considerar el uso de camelCase.

- `ord500.pgm.sqlrpgle`
- `ord600.pgm.cbble`
- `qrpglesrc/faq500.rpgle`

## Extensiones válidas

Las extensiones utilizadas para tus fuentes generalmente pueden seguir el estándar de los atributos del miembro (por ejemplo, `.rpgle`, `.sqlrpgle`, `.cbble`, `.clle`, etc.).

Sin embargo, se anima a utilizar una extensión adicional para identificar si tu fuente es un programa o un módulo, además de la extensión regular.

- `sale10.rpgle` indica un módulo (que podría convertirse en un programa de servicios o parte de un programa de varios módulos)
- `ord600.pgm.cbble` indica que esta fuente debe convertirse en un programa

## Inclusión de copias y copybooks

Se recomienda que todas las inclusiones (también conocidas como copybooks o encabezados) para RPGLE y COBOL utilicen la extensión `.xxxinc`.

Por ejemplo:

- `ordsrv.rpgleinc` es una inclusión de RPGLE.
- `pwrdta.cbbleinc` es una inclusión de COBOL.

Para C y C++, debes continuar utilizando la extensión estándar `.h` para los archivos de encabezado.

## Declaraciones de inclusión (RPGLE)

Al utilizar `/COPY` y `/INCLUDE` en RPGLE con un proyecto local, la ruta siempre debe ser relativa al directorio del proyecto y no relativa al archivo activo. En general, cuanto más explícito seas, más fácil será el mantenimiento a largo plazo.

- Funciona: `/copy 'faq500.rpgleinc'`,
- **Mejorado**: `/copy 'qrpgleref/faq500.rpgleinc'`

Aunque es posible utilizar `INCDIR` y luego no proporcionar un directorio en la declaración de inclusión, al leer el código, es mucho más claro de dónde proviene el archivo.

Si deseas que tu proyecto local resuelva archivos en el IFS, asegúrate de especificar tus 'directorios de inclusión':

- Utilizando el parámetro `INCDIR` disponible en la mayoría de los compiladores ILE,
- o dentro del [archivo `iproj.json` con la propiedad `includePath`](https://ibm.github.io/vscode-ibmi-projectexplorer/#/pages/ibm-i-projects/iproj-json?id=includepath) para las rutas donde el compilador debería buscar (esto es compatible con ibmi-bob).

## Estructura de proyecto de ejemplo

Consulta el [repositorio company_system](https://github.com/worksofliam/company_system) para ver un buen ejemplo de proyecto que sigue estas reglas.
