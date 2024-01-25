# ILEDocs

Code for IBM i sigue el estándar ILEDocs para escribir documentación para los lenguajes ILE. Este documento cubre principalmente cómo utilizarlo con RPGLE de formato libre.

Code for IBM i utilizará el bloque de documentación para mejorar la asistencia de contenido y el soporte de información al pasar el cursor.

## Formato estándar

### Diseño

El formato del bloque de documentación es el siguiente.

1. Comienza con `///` - esto inicia el bloque de documentación para el procedimiento
2. El primer comentario es el **título**
3. Los siguientes comentarios definen la **descripción**
4. Después de la descripción, se pueden utilizar etiquetas.
5. Finaliza el bloque con `///` nuevamente.


```rpgle
///
// TITLE
// DESCRIPTION!
// Description can be multiline
// @tag data
// @tag data
///
Dcl-Proc ...
```
### Puede ser utilizado en

Los bloques de documentación se pueden utilizar en prácticamente cualquier funcionalidad de RPG:

* Constantes
* Variables/estructuras
* Procedimientos
* Subrutinas

### Etiquetas disponibles

Todas las etiquetas comienzan con `@`. Las etiquetas en negrita son las más comúnmente utilizadas.

* **param** - varias líneas - Descripción del parámetro
* **return** - varias líneas - Descripción del valor de retorno
* **deprecated** - varias líneas - Descripción de por qué no se debe utilizar un programa o procedimiento y cualquier reemplazo indicado.
* author - una línea - Autor del código fuente
* date - una línea - Fecha (cualquier formato)
* brief (title) - una línea - Debe ser la primera etiqueta en un bloque ILEDocs. La etiqueta también puede ser ignorada, ver ejemplo anterior.
* link - varias líneas - @link http://url Descripción
* rev (revision) - varias líneas - `@rev fecha autor`, las líneas siguientes son la descripción de la revisión
* project - una línea - Nombre del proyecto (para que el módulo pueda ubicarse bajo el proyecto correspondiente en la interfaz de usuario)
* warning - varias líneas
* info - varias líneas
* throws - varias líneas - Id y descripción de un mensaje de escape que el usuario del programa/procedimiento puede esperar en ciertos casos
* version - una línea - Versión del módulo

## Conceptos básicos

Reglas básicas:

* Toda la documentación es opcional, pero cuanto mejor sea la documentación que proporciones, mejor será la asistencia de contenido y la documentación generada.
* Para cada parámetro en un procedimiento, debería haber tantas etiquetas `@param` que proporcionen una breve descripción de qué es el parámetro.
* La primera línea del bloque de documentación siempre es el título.

```rpgle
///
// Transform to lowercase
// This procedure will take a string and transform it to lowercase
//
// @param The string
// @return The lowercase value
///
Dcl-Proc ToLower Export;
  Dcl-Pi *N Char(20);
    stringIn Char(20);
  End-pi;

  return STRLOWER(stringIn);
End-Proc;
```