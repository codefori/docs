> This feature is not yet available. See the [PR on GitHub](https://github.com/halcyon-tech/vscode-ibmi/pull/967).

It is possible to use Code for IBM i to make remote debugging easy.

There is a new `debug` property in the `actions.json` file which tells Code for IBM i to connect to the remote debugger. `&PORT` is a new variable that is a random number between 40000 and 50000. This doesn't guarantee this port is available.

When debugging remotely, local environment variables are not passed to the server. Environment configuration will need to be setup separately. Common practice is to have a shell script/dotenv/etc to setup your environment variables before invoking the debugger on the server.

| Support     | Environment |
|-------------|---------|
| ✅ | Node.js |
| ✅ | Python  |
| ❌ Planned | PHP |

## Node.js

This assumes you're developing Node.js locally and have a deployment directory setup. To start the remote debugger, make sure to use the `--inspect-brk` parameter on the Node.js CLI. [Read more about the Node.js debugger here](https://nodejs.org/en/docs/guides/debugging-getting-started/).

```json
{
  "extensions": [
    "GLOBAL"
  ],
  "name": "Deploy Node.js and debug",
  "command": "node --inspect-brk=0.0.0.0:&PORT index.js",
  "environment": "pase",
  "deployFirst": true,
  "debug": "node"
}
```

## Python

This assumes you're developing Python locally and have a deployment directory setup. To debug Python locally or remotely, you need the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) installed. On the connected IBM i, `debugpy` installed into a Virtual Environment (venv).

#### Creating a venv

1. `python -m venv --system-site-packages ~/envs/debug` to create a new venv in your home directory.
2. `source ./envs/debug/bin/activate` to activate your venv.
3. `python -m pip install --upgrade debugpy` to install `debugpy` into your venv.

#### Local action

To start the remote debugger, use `debugpy` from your venv. [Read more about the Python debugger here](https://github.com/microsoft/debugpy).

```json
{
  "extensions": [
    "GLOBAL"
  ],
  "name": "Deploy Python and debug",
  "command": "source ~/envs/debug/bin/activate && python -m debugpy --listen 0.0.0.0:&PORT --wait-for-client &RELATIVEPATH",
  "environment": "pase",
  "deployFirst": true,
  "debug": "python"
}
```