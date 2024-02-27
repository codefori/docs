Hay cuatro variedades de Acciones:

- si el tipo es `file` y 'deploy first' está habilitado, despliega el espacio de trabajo, luego:
- ejecutar inmediatamente,
- o pueden mostrarse para su modificación,
- o pueden solicitarse a través de la interfaz de usuario.

## Ejecutar Inmediatamente

Si tenemos un comando "**Llamar programa**" con una cadena "Comando a ejecutar" como esta:

`CALL &LIBRARY/&NAME`  

Se ejecutará inmediatamente al seleccionarlo.

## Mostrar para Modificación

<!-- panels:start -->

<!-- div:left-panel -->


Si la cadena "Comando a ejecutar" tiene un `?` al principio, como `?CALL &LIBRARY/&NAME`, entonces el comando se muestra y es editable antes de ejecutarse.

<!-- div:right-panel -->

![Acción Mostrada para Modificación](../../../../assets/actions_exec_01.png)

<!-- panels:end -->

<!-- panels:start -->

<!-- div:left-panel -->

Por ejemplo, podrías querer agregar `PARM('Douglas' 'Adams')` al final.

<!-- div:right-panel -->

![Acción Modificada](../../../../assets/actions_exec_02.png)

<!-- panels:end -->

## Solicitado

En lugar de usar el "?", puedes hacer que la Acción solicite valores.
La cadena "Comando a ejecutar" puede tener cadenas de solicitud incrustadas para invocar la solicitud.

Una "cadena de solicitud" tiene el formato ``${NAME|LABEL|[DEFAULTVALUE]}`` donde:

- NAME es un nombre arbitrario para el campo de solicitud, pero debe ser único para esta acción.
- LABEL es el texto para describir el campo de solicitud.
- [DEFAULTVALUE] es un valor **opcional** para prellenar el campo de solicitud.

---

### *Ejemplo 1*

<!-- panels:start -->

<!-- div:left-panel -->

Supongamos que tenemos una acción "**Llamar programa, solicitar parámetros**" con el "Comando a ejecutar" definido así:



```
CALL &LIBRARY/&NAME PARM('${AAA|First name|Your name}' '${xyz|Last Name}')
```

Si ejecutamos la acción, solicita así:

<!-- div:right-panel -->

![Ejemplo de Acción de Solicitud 1](../../../../assets/actions_exec_03.png)

<!-- panels:end -->

<!-- panels:start -->

<!-- div:left-panel -->


Si completamos la pantalla así:

y hacemos clic en **Ejecutar**, se ejecuta un comando como este;


```
CALL LENNONS1/ATEST PARM('Douglas' 'Adams')
```

<!-- div:right-panel -->

![Acción Solicitada Completada](../../../../assets/actions_exec_04.png)

<!-- panels:end -->

---

### *Ejemplo 2*

<!-- panels:start -->

<!-- div:left-panel -->

También puedes usar variables en la cadena de solicitud. Si una acción está definida así:



```
CALL &LIBRARY/&NAME PARM('${AAA|Library|&CURLIB}' '${xyz|Report Name}')
```

&CURLIB será sustituido y la solicitud se verá así cuando se ejecute:

<!-- div:right-panel -->

![Ejemplo de Acción Solicitada 2](../../../../assets/actions_exec_05.png)

<!-- panels:end -->

---

### *Ejemplo 3*

<!-- panels:start -->

<!-- div:left-panel -->

Aquí tienes un ejemplo más complejo de una acción "**Ejecutar CRTBNDRPG (entradas)**".
La cadena 'Comando a ejecutar" está definida así:


```
CRTBNDRPG PGM(${buildlib|Build library|&BUILDLIB}/${objectname|Object Name|&NAME}) SRCSTMF('${sourcePath|Source path|&FULLPATH}') OPTION(*EVENTF) DBGVIEW(*SOURCE) TGTRLS(*CURRENT)
```


Cuando se ejecuta, solicita así:

<!-- div:right-panel -->

![Panel a la derecha](../../../../assets/compile_04.png)

<!-- panels:end -->
