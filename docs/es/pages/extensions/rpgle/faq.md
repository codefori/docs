> ¿Funciona esto solo con formato libre?

La asistencia de contenido y la vista de contornos funcionan para todas las versiones de ILE RPG, incluido el formato fijo. La asistencia de columnas es solo para el formato fijo. El linter es solo para el formato `**FREE`.

> ¿Funciona esto con proyectos locales?

¡Sí! Pero, tu RPGLE local debe tener la ruta de estilo IFS en tus directivas `copy` e `include`. Cuando desarrollas localmente, las rutas de inclusión no distinguen entre mayúsculas y minúsculas.
