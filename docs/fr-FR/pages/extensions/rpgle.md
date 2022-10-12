
## L'installation

L'extension s'installe depuis la [Marketplace](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.vscode-rpgle).
Elle est incluse dans l'extension [IBM i Development Pack](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.ibm-i-development-pack).

RPGLE language tools fonctionne aussi dans VS Code web.

## Usage

L'extension a deux fonctionnalités principales:

* des outils pour le langage: assistance à la saisie, vue structure (outline view), etc. toutes les versions de format du langage RPG ILE sont supportées (fixe, mixte, libre)
* Correcteur (linter): un correcteur extensible pour contrôler la qualité du code. **Seulement pour le format libre** (`**FREE`).

Les outils pour le langage sont activés par défaut, mais le correcteur doit être activé dans les paramètres dans Vs code. Le correcteur est toujours activé avec VS Code web.

## Création de configuration des règles du correcteur

Vous pouvez créer une configuration de correcteur pour tous les types de type de fichier. Utilisez la commande `Open RPGLE lint configuration` command de la palette de commandes pour créer et ouvrir automatiquement la configuration du correcteur relative au source RPGLE dans laquelle vous travaillez.

### Configuration de correcteur relative

* Si vous développez dans `LIB/QRPGLESRC/MYSOURCE.RPGLE`, la configuration de Linter existe dans `LIB/VSCODE/RPGLINT.JSON`. Chaque bibliothèque a son propre fichier de configuration de règles, le liant à toutes les sources RPGLE de la bibliothèque. 
* Lors d'un développement dans l'IFS, la configuration des règles existe dans `.vscode/rpglint.json` par rapport au répertoire de travail actuel.
* Lors du développement dans un espace de travail local, les règles de linter existent dans `.vscode/rpglint.json` par rapport à l'espace de travail.

### Options du correcteur

Vous trouverez ci-dessous quelques configurations de correcteur disponibles. [Voir le schéma `rpglint.json` pour les règles les plus récentes](https://github.com/halcyon-tech/vscode-rpgle/blob/main/src/schemas/rpglint.json).

| Type | Rule | Value | Description |
|---|---|---|---|
| 🌟 | indent | number | Indentation dans le RPGLE. |
| 🌟 | BlankStructNamesCheck | boolean | Les noms de structure doivent être renseignées (pas *N). |
| 🌟 | QualifiedCheck | boolean | Les noms de structure doivent être qualifiés (QUALIFIED). |
| 🌟 | PrototypeCheck | boolean |Les prototypes ne peuvent être définis qu'avec soit EXT, EXTPGM ou EXTPROC |
| 🌟 | ForceOptionalParens | boolean | Les expressions doivent être entourées de parenthèses. |
| 🌟 | NoOCCURS | boolean | OCCURS n'est pas autorisé. |
| 🤔 | NoSELECTAll | boolean | 'SELECT *' n'est pas autorisé en SQL embarqué. |
| 🌟 | UselessOperationCheck | boolean | Les codes opérations redondants (EVAL, Callp) ne sont pas autorisés. |
| 🌟 | UppercaseConstants | boolean | Les constantes doivent être en majuscules.|
| 🌟 | IncorrectVariableCase | boolean | Les noms de variables doivent correspondre la définition de casse. |
| 🌟 | RequiresParameter | boolean | Les parenthèses doivent être utilisées lors d'un appel de procédure, même s'il n'a aucun paramètre. |
| 🌟 | RequiresProcedureDescription | boolean | Les titres et les descriptions des procédures doivent être renseignées. |
| 🌟 | StringLiteralDupe | boolean | Les littéraux de chaîne en double ne sont pas autorisés. |
| 🌟 | RequireBlankSpecial | boolean | *BLANK doit être utilisé sur des littéraux de chaîne vides. |
| 🌟 | CopybookDirective | string | Force quelle directive doit être utilisée pour inclure une autre source. (`COPY` ou `INCLUDE`) |
| 🌟 | UppercaseDirectives | boolean | Les directives doivent être en majuscules. |
| 🤔 | NoSQLJoins | boolean | Les jointures en SQL embarqué ne sont pas autorisés. |
| 🌟 | NoGlobalsInProcedures | boolean | L'utilisation de variables globales n'est pas autorisée dans les procédures. |
| 🌟 | SpecificCasing | array | Spécifications de casse pour les codes opérations, les déclarations ou le code des fonctions intégrées. |
| 🌟 | NoCTDATA | boolean | CTDATA n'est pas autorisé. |
| 🌟 | PrettyComments | boolean | Les commentaires ne peuvent pas être vides et ils doivent commencer par un espace et avoir une indentation correcte. |
| 🌟 | NoGlobalSubroutines | boolean | Les sous-routines globales ne sont pas autorisées. |
| 🌟 | NoLocalSubroutines | boolean | Les sous-routines ne sont pas autorisés dans les procédures. |
| 🌟 | NoUnreferenced | boolean | Les définitions non référencées ne sont pas autorisées. |
| 🔒 | NoExternalTo | string array | Les appels à certaines API ne sont pas autorisés. (EXTPROC / EXTPGM) |
| 🔒 | NoExecuteImmediate | boolean | SQL embraqué intégrée avec exécution immédiate non autorisé. |
| 🔒 | NoExtProgramVariable | boolean | Déclarer un prototype avec EXTPGM et EXTPROC à l'aide d'une procédure est désormais autorisé. |
| 🤔 | IncludeMustBeRelative | boolean | Lorsque vous utilisez des instructions de copie ou d'inclure, le chemin doit être relatif. Pour les membres, vous devez au moins inclure le fichier source.Pour StreamFiles, il est relatif du répertoire de travail. |
| 🤔 | SQLHostVarCheck | boolean | Avertit lorsque des variables sont référencées dans du SQL Embarqué et sont également définies localement. | 

**Type key**

| Key | Value |
|---|---|
| 🌟 | Code propre |
| 🤔 | Code sûr |
| 🔒 | Code sécurisé |