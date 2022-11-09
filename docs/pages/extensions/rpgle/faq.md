> Does this only work with free-format?

The content assist and outline view works for all ILE versions of RPG, including fixed-format. The column assist is for fixed-format only. The linter is for `**FREE` format only.

> My copybook is not opening or prototypes are not coming from my copybook.

Right now, it is an explicit path to your member or streamfile. For example, if you're editing `YOURLIB/QRPGLESRC/HELLOWORLD.rpgle` and your copybook path is `QRPGLEREF,PRTYPE`, then it will assume the library of `YOURLIB`.

> Does this work with local projects?

Yes! But, your local RPGLE must be the IFS style path on your `copy` and `include` directives. When developing locally, include paths are case insensitive.