
The information below is specific to the linter in the RPGLE extension.

### Relative lint config

* If you are developing in source members (`LIB/QRPGLESRC/MYSOURCE.RPGLE`)
   * the the linter config exists in `LIB/VSCODE/RPGLINT.JSON`. 
   * Each library has its own rules configuration file, binding it to all RPGLE sources in that library. 
   * config changes get pickup when RPGLE sources are re-opened.
* When developing in the IFS:
   * linter rules config exist in `.vscode/rpglint.json` relative to the current working directory.
   * config changes get pickup when RPGLE sources are re-opened.
* When developing in a local workspace
   * linter rules exist in `.vscode/rpglint.json` relative to the workspace.
   * Local RPGLE gets scanned automatically when config is changed

### Lint options

Below are some available lint configs. [See the `rpglint.json` schema for the most up to date rules](https://github.com/halcyon-tech/vscode-rpgle/blob/main/schemas/rpglint.json).

| Type | Rule | Value | Description |
|---|---|---|---|
| 🌟 | indent | number | Indent for RPGLE. |
| 🌟 | BlankStructNamesCheck | boolean | Struct names cannot be blank (*N). |
| 🌟 | QualifiedCheck | boolean | Struct names must be qualified (QUALIFIED). |
| 🌟 | PrototypeCheck | boolean | Prototypes can only be defined with either EXT, EXTPGM or EXTPROC |
| 🌟 | ForceOptionalParens | boolean | Expressions must be surrounded by brackets. |
| 🌟 | NoOCCURS | boolean | OCCURS is not allowed. |
| 🤔 | NoSELECTAll | boolean | 'SELECT *' is not allowed in Embedded SQL. |
| 🌟 | UselessOperationCheck | boolean | Redundant operation codes (EVAL, CALLP) not allowed. |
| 🌟 | UppercaseConstants | boolean | Constants must be in uppercase. |
| 🌟 | IncorrectVariableCase | boolean | Variable names must match the case of the definition. |
| 🌟 | RequiresParameter | boolean | Parentheses must be used on a procedure call, even if it has no parameters. |
| 🌟 | RequiresProcedureDescription | boolean | Procedure titles and descriptions must be provided. |
| 🌟 | StringLiteralDupe | boolean | Duplicate string literals are not allowed. |
| 🌟 | RequireBlankSpecial | boolean | *BLANK must be used over empty string literals. |
| 🌟 | CopybookDirective | string | Force which directive which must be used to include other source. (`COPY` or `INCLUDE`) |
| 🌟 | UppercaseDirectives | boolean | Directives must be in uppercase. |
| 🤔 | NoSQLJoins | boolean | JOINs in Embedded SQL are not allowed. |
| 🌟 | NoGlobalsInProcedures | boolean | Globals are not allowed in procedures. |
| 🌟 | SpecificCasing | array | Specific casing for op codes, declartions or built-in functions codes. |
| 🌟 | NoCTDATA | boolean | CTDATA is not allowed. |
| 🌟 | PrettyComments | boolean | Comments cannot be blank, must start with a space and have correct indentation. |
| 🌟 | NoGlobalSubroutines | boolean | Global subroutines are not allowed. |
| 🌟 | NoLocalSubroutines | boolean | Subroutines in procedures are not allowed. |
| 🌟 | NoUnreferenced | boolean | Unreferenced definitions are not allowed. |
| 🔒 | NoExternalTo | string array | Calls to certain APIs are not allowed. (EXTPROC / EXTPGM) |
| 🔒 | NoExecuteImmediate | boolean | Embedded SQL statement with EXECUTE IMMEDIATE not allowed. |
| 🔒 | NoExtProgramVariable | boolean | Declaring a prototype with EXTPGM and EXTPROC using a procedure is now allowed. |
| 🤔🌟 | IncludeMustBeRelative | boolean | When using copy or include statements, path must be relative to the root. Usage is only recommended for local/workspace projects. |
| 🤔 | SQLHostVarCheck | boolean | Warns when referencing variables in Embedded SQL that are also defined locally. | 
| 🤔 | RequireOtherBlock | boolean | Requires `SELECT` blocks to have an `OTHER` block. |

**Type key**

| Key | Value |
|---|---|
| 🌟 | Clean code |
| 🤔 | Safe code |
| 🔒 | Secure code |