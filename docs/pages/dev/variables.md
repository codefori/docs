We provide some context values and environment variables so extensions and managed environments can control Code for IBM i.

| Type                 | Name                              | Values      | Comment                                            |
|----------------------|-----------------------------------|-------------|----------------------------------------------------|
| Context value        | `code-for-ibmi:libraryListDisabled` | boolean     |                                                    |
| Environment variable | `DEBUG_MANAGED`                     | boolean     | PR pending                                         |
| Environment variable | `DEBUG_CA_PATH`                     | string path | PR pending, only uses when `DEBUG_MANAGED` is true |