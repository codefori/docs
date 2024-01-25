### Establecer una conexión

1. Presiona F1.
2. Encuentra 'IBM i: Nueva Conexión'.
3. Ingresa los detalles de tu conexión en la ventana que se abre.
4. Haz clic en Conectar.

Consejo: la próxima vez, intenta usar 'IBM i: Conectar a la anterior'.

### Navegar/Editar miembros fuente

1. Conéctate a tu sistema.
2. Encuentra el EXPLORADOR DE OBJETOS y haz clic en **+ Crear nuevo filtro**.
3. Completa el diálogo del nuevo filtro, siguiendo el texto descriptivo, asegurándote de:
   a. Que **Objeto** sea el archivo físico fuente que deseas editar.
   b. Que el **Filtro de tipo de objeto** esté configurado como *SRCPF.
4. Guarda la configuración.
5. Haz clic en el filtro para expandir los miembros en el archivo fuente.
6. Haz clic en un miembro para abrirlo.

 > [!NOTA]
> No hay bloqueo de miembros y la extensión no retiene automáticamente las fechas de origen.

### ¿Cómo compilo mi código fuente?

1. Edita tu lista de bibliotecas en el explorador 'LISTA DE BIBLIOTECAS DEL USUARIO'. (Cada conexión tiene su propia lista de bibliotecas.)
2. Abre el fuente que deseas compilar.
3. Usa Ctrl+E o Cmd+E para compilar tu fuente.
4. Si tienes más de una opción de compilación disponible para el tipo de fuente, selecciona la apropiada.
5. Si estás utilizando `*EVENTF`, el listado de errores debería cargarse automáticamente en la pestaña PROBLEMAS.
