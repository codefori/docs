Cette page décrit une structure de projet recommandée lors de l'utilisation de Git avec vos sources ILE. Code for IBM i et les extensions ultérieures suivront cette structure pour le développement local.

## Nom de fichier en minuscules

Il est recommandé de nommer les fichiers en minuscules.Généralement, C'est plus facile pour les yeux et suit la norme de la plupart des autres environnements.Vous pouvez également envisager d'utiliser Camelcase.

* `ord500.pgm.sqlrpgle`
* `ord600.pgm.cblle`
* `qrpglesrc/faq500.rpgle`

## Extensions valides

Les extensions utilisées pour votre source peuvent se "caler" sur ceux des attributs des membres (e.g. `.rpgle`, `.sqlrpgle`, `.cblle`, `.clle`, etc).

Mais, il est encouragé à utiliser une extension supplémentaire pour identifier si votre source est un programme ou un module en plus de l'extension régulière.

* `sale10.rpgle` indique un module (qui pourrait devenir un programme de service, ou une partie d'un programme multi-module)
* `ord600.pgm.cbble` indique que la source devrait devenir un programme

## "Includes" et "Copybooks"

Il est recommandé que toutes les clauses copy "includes" (aussi nommées "copybooks" ou "headers") pour RPGLE et COBOL utilisent l'extension `.xxxinc`.

Par exemple:

* `ordsrv.rpgleinc` est un "include" pour un RPG.
* `pwrdta.cblleinc` est un "include" pour un COBOL.

Pour C et C ++, vous devez continuer à utiliser le `.h` standard pour les fichiers d'en-tête.

## clauses COPY (RPGLE)

Lorsque vous utilisez `/COPY` et `/INCLUDE` en RPGLE dans un projet local, le chemin doit toujours être relatif au répertoire du projet et non par rapport au fichier actif.  
Généralement, plus vous pouvez être explicite, plus il sera facile de maintenir à long terme.

* :heavy_check_mark: : `/copy 'faq500.rpgleinc'`,
* :heavy_check_mark: :slightly_smiling_face: : `/copy 'qrpgleref/faq500.rpgleinc`

Bien qu'il soit possible d'utiliser `INCDIR` et ainsi ne pas fournir de répertoire pour l'inclusion, Lors de la lecture du code, il est beaucoup plus clair de voir d'où vient le fichier.

Si vous ne voulez pas être relatif par rapport à la racine, spécifier votre répertoire d'inclusion dans la propriété [`includePath` du fichier `iproj.json`](https://ibm.github.io/ibmi-bob/#/prepare-the-project/iproj-json?id=includepath).

## Exemple de structure de projet

Vérifiez le dépôt [company_system](https://github.com/worksofliam/company_system) d'un exemple de projet suivant ces règles.