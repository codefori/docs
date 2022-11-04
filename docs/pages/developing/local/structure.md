This page outlines a recommended project structure when using git with your ILE sources. Code for IBM i and subsequent extensions will follow this structure for local development.

## Lowercase file names

It is recommend to always use lowercase file names. Generally, it is easier on the eyes and follows the standard of most other environments. You could also consider using camelCase.

* `ord500.pgm.sqlrpgle`
* `ord600.pgm.cblle`
* `qrpglesrc/faq500.rpgle`

## Valid extensions

The extensions used for your source can generally follow suit from member attributes (e.g. `.rpgle`, `.sqlrpgle`, `.cblle`, `.clle`, etc).

But, it is encouraged to use an additional extension to identify that your source is a program or a module in addition to the regular extension.

* `sale10.rpgle` indicates a module (which could become a service program, or part of a multi-module program)
* `ord600.pgm.cbble` indicates that is source should become a program

## Includes and copybooks

It is recommended that all includes (also referred to as copybooks or headers) for RPGLE and COBOL use the extension of `.xxxinc`.

For example:

* `ordsrv.rpgleinc` is a RPGLE include.
* `pwrdta.cblleinc` is a COBOL include.

For C and C++, you should continue to use the standard `.h` for header files.

## Include statements (RPGLE)

When using `/COPY` and `/INCLUDE` in RPGLE with a local project, the path should always be relative to the project directory and not relative to the active file. Generally, the more explicit you can be, the easier it will be the maintain long term.

* Works: `/copy 'faq500.rpgleinc'`,
* **Improved**: `/copy 'qrpgleref/faq500.rpgleinc'`

While it is possible to use `INCDIR` and then not provide a directory on the include statement, when reading the code, it is a lot clearer where the file is coming from.

If you want to not be relative from the root, make sure you specify your 'include directories' inside the [`iproj.json` file with the `includePath` property](https://ibm.github.io/ibmi-bob/#/prepare-the-project/iproj-json?id=includepath).

## Example project structure

Check out the [company_system](https://github.com/worksofliam/company_system) repository for a good example project which follows these rules.
