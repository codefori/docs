### Comparación de fuentes

<!-- paneles:inicio -->

<!-- div:panel-izquierdo -->

Compara dos fuentes, ya sean miembros o archivos de flujo.

1. Haz clic derecho en cualquiera de los tipos, elige 'Seleccionar para comparar'.
2. Haz clic derecho en la otra fuente que deseas comparar y elige 'Comparar con la seleccionada'.

<!-- div:panel-derecho -->

![assets/compare_01.png](../../../assets/compare_01.png)

<!-- paneles:fin -->

### Ejecución de una declaración SQL

<!-- paneles:inicio -->

<!-- div:panel-izquierdo -->

Instala la [extensión Db2 for IBM i](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.vscode-db2i) para esta funcionalidad. [Consulta la documentación aquí](pages/extensions/db2i/index).

También es posible ejecutar declaraciones SQL directamente desde el editor en un archivo SQL. Puedes resaltar la declaración que deseas ejecutar o mover tu ancla sobre la declaración y usar Ctrl+R/Cmd+R para ejecutar la declaración.

Los conjuntos de resultados de SQL aparecen en el panel 'IBM i: Resultados'.

<!-- div:panel-derecho -->

![assets/db_03.png](../../../assets/db_03.png)

<!-- paneles:fin -->


### Buscar archivos fuente y directorios IFS

Haz clic derecho y selecciona 'Buscar' en directorios IFS y archivos fuente para buscar a través del contenido de archivos de flujo y miembros fuente.

### Sobrescribir

VS Code funciona en modo de "inserción". Esto puede resultar molesto al editar un fuente en modo fijo, como DDS. Afortunadamente, hay una [extensión de sobrescritura](https://marketplace.visualstudio.com/items?itemName=DrMerfy.overtype) que te permite alternar entre inserción y sobrescritura, y también puede mostrar el modo actual en la barra de estado.

### Tamaño de Fuente

El tamaño de fuente en el editor está controlado por la configuración de VS Code *Editor: Font Size*. Sin embargo, con el cursor en un editor, también puedes cambiar temporalmente el tamaño de fuente del editor manteniendo presionado Ctrl y usando la barra de desplazamiento del mouse.

El tamaño de fuente en las barras de menú, laterales, de estado y de actividad se puede cambiar manteniendo presionado Ctrl y usando + o -. Dichos cambios se mantendrán de sesión a sesión. Sin embargo, esto también cambiará el tamaño de fuente del editor y es posible que debas ajustarlo como se menciona anteriormente para esta sesión.

Consejo práctico: Experimenta.
