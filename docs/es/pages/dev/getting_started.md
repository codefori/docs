Es muy fácil trabajar con la extensión vscode-ibmi.

### Desarrollo y depuración

1. Clona el repositorio.
2. `npm i`
3. Ejecuta 'Run extension' desde la depuración de VS Code.

### Crear un archivo `.vsix`

Para construir un archivo `.vsix` de la extensión, puedes usar:

```terminal
npm run package
```
### Ejecutar casos de prueba

Para ejecutar las pruebas, inicia la depuración de la configuración **Extension Tests** y conéctate a un sistema para que se ejecuten las pruebas.

![test debug](../../../assets/dev_01.png)

Después de que se lance el Extension Host, conéctate a un sistema; este sistema es donde se ejecutarán las pruebas. Las pruebas no deben alterar ninguna configuración del sistema ni archivos existentes.

<!-- panels:start -->

<!-- div:left-panel -->

Después de conectarte, las pruebas se iniciarán automáticamente. Puedes ver qué pruebas se están ejecutando en la vista Test Cases.

<!-- div:right-panel -->

![test cases view](../../../assets/dev_02.gif)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Si una prueba falla, puedes ver el resultado al pasar el mouse sobre la prueba fallida.

<!-- div:right-panel -->

![test case fail](../../../assets/dev_03.png)

<!-- panels:end -->
