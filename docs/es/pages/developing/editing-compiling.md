## Edición

Para abrir código fuente, puedes [crear un filtro en el Navegador de Objetos](pages/browsers/object-browser.md) para explorar archivos fuente.

<!-- panels:start -->

<!-- div:left-panel -->

Haz clic en un miembro fuente o archivo de flujo en el navegador para abrirlo. Puedes tener varios archivos abiertos.

Ahora puedes editar el código fuente utilizando todas las funciones de VS Code.

<!-- div:right-panel -->

 ![Ejemplo de edición](../../../assets/EditComp-01.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Para maximizar tu pestaña de edición, prueba:

- Ocultar/mostrar la barra lateral con **Ctrl+B**. (O utilizando el menú Ver.)
- Alternar pantalla completa con **F11**

Consulta **Ayuda** en el menú para obtener consejos, trucos, atajos de teclado de edición y tutoriales.

<!-- div:right-panel -->

![Máximo espacio de edición](../../../assets/EditComp-02.png)

<!-- panels:end -->

---

### Fechas de origen

El soporte para fechas de origen debe estar habilitado y está desactivado de forma predeterminada. Esto se puede cambiar en la Configuración de Conexión. Consulta más en la [página de Fechas de Origen](sourcedates.md).

## Compilación

Compila la **pestaña activa** con Ctrl+E.

- Si hay cambios sin guardar, se te informará que primero debe guardarse y también se te dará la opción de siempre guardar antes de compilar.
- Si haces clic en **Guardar automáticamente**, las solicitudes de compilación subsiguientes siempre se guardarán primero si hay cambios. (En *Configuración: Conexión*, más abajo, puedes desactivar la opción de guardado automático.)
- Si hay más de una opción de compilación para tu tipo de fuente, selecciona la adecuada.

<!-- panels:start -->

<!-- div:left-panel -->

Si la compilación se completa sin errores, verás un mensaje informativo como este:

<!-- div:right-panel -->

![Compilación exitosa](../../../assets/EditComp-03.png)

<!-- panels:end -->

---

### Errores de Compilación

<!-- panels:start -->

<!-- div:left-panel -->

Si la compilación falla, verás un mensaje de error como este:

<!-- div:right-panel -->

![Compilación fallida](../../../assets/EditComp-04.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

En el código fuente, los errores se resaltarán con líneas onduladas y si pasas el ratón por encima de la línea ondulada, verás detalles del error:

<!-- div:right-panel -->

![Errores ondulados](../../../assets/EditComp-05.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Puedes ir al próximo error con **F8**.  **Shift+F8** para el error anterior.

<!-- div:right-panel -->

![F8 próximo error](../../../assets/EditComp-05A.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Si tienes la pestaña **Problemas** abierta en el Panel, mostrará la lista de errores. Hacer clic en una línea en la pestaña **Problemas** te llevará a la línea en el código fuente.

Ctrl+J abre el panel, Ctrt+Shift+M abre la pestaña **Problemas**. 

<!-- div:right-panel -->

![Pestaña Problemas](../../../assets/EditComp-06.png)

<!-- panels:end -->

---

<!-- Para tener la pestaña **Problemas** siempre abierta automáticamente, cambia esta configuración:

`Code-for-ibmi: Post Action View` Determina qué vista se debe mostrar al ejecutar Acciones -->

<!-- panels:start -->

<!-- div:left-panel -->

Decide qué errores, advertencias o mensajes de información mostrar usando el icono de filtro. Si has estado compilando varios fuentes, es posible que también desees marcar **Mostrar solo el archivo activo**.

<!-- div:right-panel -->

![Filtro de errores](../../../assets/EditComp-07.png)

<!-- panels:end -->

---

Puedes eliminar todas las líneas onduladas usando **F1** para abrir la paleta de comandos y buscar 'IBM i Clear Diagnostics'

![Limpiar diagnósticos](../../../assets/EditComp-08.png)

### Listado de Compilación

El listado de compilación siempre se dirige a un terminal, en caso de que necesites revisarlo.

![Listado de Compilación en Terminal](../../../assets/compile_list_01.png)

#### Notas del Terminal

- Por lo general, los terminales se encuentran en el panel, como se muestra arriba. En su lugar, también puedes abrirlos en un editor con esta configuración:

  `Terminal › Integrated: Default Location` controla dónde aparecerán los terminales recién creados.

- Si estás compilando programas grandes, es posible que desees ajustar esta configuración:

  `Terminal › Integrated: Scrollback` controla el número máximo de líneas que el terminal conserva en su búfer. 

- Es posible que desees ajustar la altura de línea en el terminal, con esta configuración:

  `Terminal › Integrated: Line Height` controla la altura de línea del terminal. 
