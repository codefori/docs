
# ILEDocs

Code for IBM i suit la norme ILEDOCS pour écrire la documentation des sources en ILE. Ce document couvre principalement son utilisation en RPGLE format libre.

Code for IBM i utilise le bloc de documentation du code pour améliorer l'assistance à la saisie et le survol des zones (Hover).

## Format standard

### Disposition

Le format d'un bloc de documentation est le suivant.

1. Commencer avec `///` - Cela démarre le bloc de documentation pour la procédure
2. Le premier commentaire est le **titre**
3. Les commentaires suivants sont la **description** (multi-lignes possible) 
4. Après la description, les balises (tags) peuvent être utilisées.
5. Le bloc se finit par `///`.

```rpgle
///
// TITRE
// DESCRIPTION!
// La description peut être multi-lignes  
// @tag data
// @tag data
///
Dcl-Proc ...
```

### Utilisation

Les blocs de documentation peuvent être utilisés sur à peu près toutes les fonctionnalités RPG:

* Constantes
* Variables/Structures
* Procedures
* Sous routines

### Balises disponibles

Toutes les balises commencent par `@`.  
Les balises en gras sont les plus couramment utilisées.

* **param** - multi-lignes - Description d'un paramètre
* **return** - multi-lignes - Description de la valeur de retour
* **deprecated** - multi-lignes - Décrit Pourquoi un programme ou une procédure ne doit pas être utilisé et indique un remplacement.
* author - une seule ligne - Auteur du code source
* date - une seule ligne - Date (Tout format)
* brief (titre) - une seule ligne - Doit être la première balise d'un bloc ILEDOCS. La balise peut également être ignorée, voir l'exemple ci-dessous.
* link - multi-lignes - @link http://url Description
* rev (revision) - multi-lignes - `@rev date author`, Les lignes suivantes sont la description de la révision
* project - une seule ligne - Nom du projet (afin que le module puisse être placé sous le projet correspondant dans l'interface utilisateur)
* warning - multi-lignes
* info - multi-lignes
* throws - multi-lignes - Id and la description d'un message d'échappement que l'utilisateur du programme / procédure peut s'attendre à rencontre dans certains cas
* version - une seule ligne - version du module

## Les bases

Règles de base:

* Toute la documentation est facultative, mais meilleure documentation est la documentation fournie, meilleure est l'assistance à la saisie et la documentation générée.
* Pour chaque paramètre d'une procédure, il devrait y avoir autant de balises `@param` fournissant une brève description de la nature du paramètre. 
* La première ligne du bloc de documentation est toujours le titre.

```rpgle
///
// Transforme en minuscules
// Cette procédure prends une chaîne en entrée et la transforme en minuscules
//
// @param une chaîne
// @return une chaîne en minuscules
///
Dcl-Proc ToLower Export;
  Dcl-Pi *N Char(20);
    stringIn Char(20);
  End-pi;

  return STRLOWER(stringIn);
End-Proc;
```