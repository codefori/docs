# Configuración de Caracteres en Code for IBM i

IBM i utiliza el conjunto de caracteres EBCDIC, a diferencia de tu estación de trabajo, que utiliza algún conjunto de caracteres basado en ASCII (Windows, MAC y Linux usan su propia variante). Esto puede causar algunos problemas con los nombres mostrados para los objetos, archivos y miembros en el Navegador de Objetos. Aún peor, IBM i tiene varias variantes EBCDIC, cada una dirigida a un idioma nacional, y los caracteres especiales de EE. UU. '#', '@' y '$' permitidos en los nombres de objetos y miembros de IBM i tienen otros valores de código en las otras variantes. Sin embargo, IBM i aún espera que se utilicen los mismos valores de código de los caracteres de EE. UU., y por lo tanto, se deben usar los caracteres nacionales con estos valores de código.

A partir de la versión 1.4.0 de esta extensión, el código para manejar estas diferencias ha cambiado, principalmente cuando SQL está habilitado y se usa para recuperar listas de objetos y miembros. Anteriormente, no había conversión entre los caracteres de EE. UU. y los caracteres nacionales, pero ahora Code for IBM i convierte los caracteres de EE. UU. en los caracteres nacionales. Esto está controlado por el valor del conjunto de caracteres codificado (CCSID) en el perfil de usuario IBM i utilizado para la conexión, alternativamente el valor del sistema `QCCSID` (si el valor CCSID del perfil de usuario es `*SYSVAL`). El CCSID probablemente ya esté configurado en tu perfil de usuario o sistema, pero si necesitas cambiar a otro idioma, aquí hay algunos ejemplos de cómo configurar el CCSID:

| Idioma | Comando | Caracteres de Variante |
| -------- | ------- | :----------------: |
| EE. UU. | `CHGUSRPRF _tuperfil_ CCSID(37)` | $, #, @ |
| DK | `CHGUSRPRF _tuperfil_ CCSID(277)` | Å, Æ, Ø |
| IT con euro | `CHGUSRPRF _tuperfil_ CCSID(1144)` | $, £, § |

La conversión se realiza en ambas direcciones: al leer nombres de objetos y miembros para la lista, pero también al crear un archivo fuente o miembro o al aplicar un filtro a una lista. Para usuarios no estadounidenses, siempre debes usar tus caracteres nacionales en lugar de los caracteres estadounidenses, incluso en los valores de filtro.

Si cambias el CCSID para tu perfil en el servidor, es posible que también tengas que cambiar tus filtros, ¡si has utilizado alguno de los caracteres especiales en el filtro!

El valor especial de CCSID 65535 significa "sin conversión", y esto desactivará el soporte SQL. **No** se recomienda usar CCSID 65535 y la mayoría de los sistemas más nuevos tienen un CCSID diferente de 65535. Pero puedes encontrar este valor en sistemas más antiguos. La solución aquí sería cambiar el perfil de usuario a un valor de CCSID correspondiente a tu idioma nacional, por ejemplo, 280 en Italia o 297 en Francia.

## Configuración de variables de entorno

Si aún experimentas problemas después de configurar el valor de CCSID, es posible que desees verificar que la configuración regional del entorno PASE de IBM i esté configurada correctamente:

- OS 7.4 o superior:

[7.4 y superior se configura automáticamente en UTF-8](https://www.ibm.com/docs/en/i/7.4?topic=system-default-pase-ccsid-locale-changed-utf-8) y no debería haber problemas.

- OS 7.3 o anterior:

El daemon SSH debe iniciarse con las variables de entorno `PASE_LANG` y `QIBM_PASE_CCSID` establecidas correctamente. Probablemente quieras usar una configuración regional que se configure en CCSID 1208 de forma predeterminada. **La configuración regional distingue mayúsculas y minúsculas**. Por ejemplo, `FR_FR` es diferente de `fr_FR`.

1. Cambia el idioma PASE y el CCSID *en todo el sistema* usando `WRKENVVAR LEVEL(*SYS)` para configurar:
   - la configuración regional/idioma apropiada, por ejemplo, `PASE_LANG 'FR_FR'`. Puedes encontrar información sobre las configuraciones regionales de PASE para IBM i [aquí](https://www.ibm.com/docs/en/i/7.4?topic=ssw_ibm_i_74/apis/pase_locales.htm)
   - `QIBM_PASE_CCSID` debería ser `1208`.
2. **Reinicia** el daemon SSH.

También puedes cambiar las variables de entorno a nivel de `*JOB`, pero se recomienda hacerlo una vez para todo tu sistema.

Algunos enlaces a páginas que contienen información sobre caracteres de variante:

- [Definición de IBM de caracteres de variante](https://www.ibm.com/docs/en/db2-for-zos/11?topic=ccsids-variant-characters)
- [Soporte de IBM](https://www.ibm.com/support/pages/what-impact-changing-qccsid-shipped-65535-another-ccsid)
- [Wikipedia](https://en.wikipedia.org/wiki/EBCDIC)
