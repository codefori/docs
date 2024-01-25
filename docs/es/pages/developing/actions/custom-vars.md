<!-- panels:start -->

<!-- div:left-panel -->

Puedes crear variables personalizadas para usar en tus cadenas de "Comando a ejecutar". Para acceder a las variables personalizadas:

Usa <kbd>F1</kbd>, luego busca "IBM i Custom variables":

<!-- div:right-panel -->

 ![F1 + Variable Personalizada IBM i](../../../../assets/actions_custom_01.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->
 
 O desde el navegador de Lista de Bibliotecas del Usuario:

<!-- div:right-panel -->

![Navegador de Lista de Bibliotecas](../../../../assets/actions_custom_01a.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

En la pestaña **Trabajar con Variables**, haz clic en **Nueva Variable** para agregar tu variable.

Haz clic en una variable personalizada para cambiarla o eliminarla.

<!-- div:right-panel -->

![Lista de Variables después de Guardar](../../../../assets/actions_custom_04.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Aquí estamos agregando una variable llamada `&TARGET_RLSE`.

Presiona Guardar y se mostrará la lista de variables personalizadas.

<!-- div:right-panel -->

![Añadiendo TARGET_RLSE](../../../../assets/actions_custom_03.png)

<!-- panels:end -->

---

#### *Ejemplo de Uso*

En todas las acciones CRTBNDxxx, agrega TGTRLS(&TARGET_RLSE), así:

`?CRTBNDCL PGM(&OPENLIB/&OPENMBR) SRCFILE(&OPENLIB/&OPENSPF) OPTION(*EVENTF) DBGVIEW(*SOURCE)  TGTRLS(&TARGET_RLSE)`

Ahora, un solo cambio a la variable personalizada TARGET_RLSE puede afectar a todas las acciones CRTBNDxxx.
