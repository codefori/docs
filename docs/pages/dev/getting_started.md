It's very easy to work with the vscode-ibmi extension.

### Developing and debugging

1. clone repo
2. `npm i`
3. 'Run extension' from VS Code debug.

### Creating a `.vsix`

To build a .`vsix` of the extension, you can use:

```terminal
npm run package
```

### Run test cases

To run the tests, start debugging the **Extension Tests** configuration and connect to a system for the tests to run.

![test debug](../../assets/dev_01.png)

After the Extension Host is launched, connect to a system - this system is where the test runs. The tests should not alter any system configuration or existing files.

<!-- panels:start -->

<!-- div:left-panel -->

After you've connected, the tests will launch automatically. You can see which tests are being executed in the Test Cases view.

<!-- div:right-panel -->

![test cases view](../../assets/dev_02.gif)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

If a test fails, you can see the result by hovering over the failed test.

<!-- div:right-panel -->

![test case fail](../../assets/dev_03.png)

<!-- panels:end -->