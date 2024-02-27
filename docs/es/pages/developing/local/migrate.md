## Qué significa la migración

La migración realmente significa copiar el contenido del miembro fuente al IFS. Solo una persona tiene que realizar este paso. Una vez que todo el código fuente se haya migrado a git, recomendaría que **los desarrolladores comiencen a desarrollar localmente con su nuevo repositorio git**. Si permites que alguien edite los miembros fuente mientras migras el código al IFS, tendrás que volver a copiar los miembros modificados.

<!-- panels:start -->

<!-- div:left-panel -->

Por ejemplo, tu biblioteca, archivos físicos de origen y miembros podrían verse así:


```
DEVLIB
  - QRPGLESRC
    - PROGRAMA.RPGLE
    - PROGRAMB.RPGLE
    - PROGRAMC.RPGLE
  - QSQLSRC
    - CUSTOMERS.SQL
    - INVENTORY.SQL
  - QCLLESRC
    - STARTJOB.CLLE
  - QCMDSRC
    - STARTJOB.CMD
```

<!-- div:right-panel -->

Donde la disposición resultante en el IFS podría ser muy similar:


```
/home
  /barry
    /.git
    /qrpglesrc
      programa.rpgle
      programb.rpgle
      programc.rpgle
    /qsqlsrc
      customers.sql
      inventory.sql
    /qcllesrc
      startjob.cmd
    /qcmdsrc
      startjob.cmd
```

<!-- panels:end -->

Asegúrate de que al migrar el código, lo estás haciendo en un directorio que es un repositorio local (por ejemplo, que lo clonaste) para que puedas confirmar y enviar cambios a medida que los realizas. Por ejemplo, realiza tu primer commit cuando hayas migrado el código y luego realiza otro (o varios) después de corregir los 'copybooks'.

**Notas sobre la migración al IFS**:

1. Perderás la columna TEXT que tienen los miembros fuente, que generalmente se usa para describir qué es el fuente. Sin embargo, aún puedes colocar eso en el programa como un comentario.
2. El tipo del miembro fuente se convierte en la extensión cuando está en el IFS.
3. Los archivos y directorios de fuentes generalmente se almacenan en minúsculas.
4. Se recomienda retener el límite de 10 caracteres en programas, comandos, módulos, etc. - cualquier fuente relacionada con Db2 para i no importa tanto, ya que Db2 para i y la mayoría de los lenguajes ILE admiten 'nombres largos'.

## Herramientas utilizadas para la migración

La migración inicial del código fuente puede ser la parte más difícil de todo el proceso, pero una vez que se hace: ¡se hace! Hay muchas formas de hacerlo, pero aquí solo describiré dos.

### Migración manual

Una migración consiste simplemente en mover los miembros fuente al IFS. Para nuestra ventaja, existe el comando `CPYTOSTMF`, que se puede utilizar para copiar un miembro fuente a un archivo de flujo. Por ejemplo:


```
CPYTOSTMF FROMMBR('/QSYS.lib/DEVLIB.lib/QRPGLESRC.file/PROGRAMA.mbr') TOSTMF('/home/barry/myproject/qrpglesrc/programa.rpgle') STMFOPT(*REPLACE) STMFCCSID(1208)
```

En base a este comando, tendrías que ejecutar este comando para cada miembro fuente que desees migrar.

### Uso de la herramienta de migración

Existe una herramienta de migración de código abierto, simplemente llamada 'migrate', que automatiza la copia de miembros fuente en un directorio. También crea los archivos de flujo con las extensiones correctas.

Para usar la herramienta de migración, deberás clonarla y construirla manualmente.


```
git clone https://github.com/worksofliam/migrate.git
cd migrate
gmake
```

La construcción de esta solución creará la biblioteca `MIGRATE` y dentro está el comando `MIGSRCPF`. `MIGSRCPF` tiene tres parámetros simples.

![](./images/migsrcpf.PNG)

Si tuviéramos una biblioteca con archivos físicos de origen y quisiéramos migrarlos a un nuevo directorio del proyecto, tendríamos que ejecutar el comando una vez para migrar el archivo físico de origen. Copiará el miembro fuente al IFS como un archivo de flujo de 1208 (UTF-8). Si el archivo o la carpeta que intenta crear ya existe, fallará. En el último capítulo, creamos `/home/BARRY/myproject` como un repositorio git.

Esto crearía tres directorios en `/home/BARRY/myproject` como se muestra a continuación:

<!-- panels:start -->

<!-- div:left-panel -->

```cl
MIGSRCPF LIBRARY(TESTPROJ) 
         SOURCEPF(QRPGLESRC) 
         OUTDIR('/home/BARRY/myproject')
MIGSRCPF LIBRARY(TESTPROJ) 
         SOURCEPF(QRPGLEREF) 
         OUTDIR('/home/BARRY/myproject')
MIGSRCPF LIBRARY(TESTPROJ) 
         SOURCEPF(QCLLESRC) 
         OUTDIR('/home/BARRY/myproject')
```

<!-- div:right-panel -->

```
/home
  /BARRY
    /myproject
      /qrpglesrc
        /somesource.rpgle
        /somesource.rpgle
      /qrpgleref
        /whatever.rpgle
      /qcllesrc
        /pgm1.clle
        /pgm2.clle
        /pgm3.clle
```

<!-- panels:end -->

> [!NOTE]
> Creará todos los directorios y archivos de flujo con nombres en minúsculas.

### Herramienta de migración de IBM Project Explorer

Consulta la documentación de IBM Project Explorer sobre cómo utilizar [su proceso de migración](https://ibm.github.io/vscode-ibmi-projectexplorer/#/pages/projectExplorer/migrate-source).

### Otras posibles formas

Potencialmente podrías crear un iProject en RDi basado en una biblioteca y luego tener una copia local de todo el código fuente (que luego puedes poner en un repositorio git más tarde). También puedes usar la herramienta SPF Clone en ILEditor para clonar los miembros fuente de las bibliotecas en tu máquina local (que también se puede poner en un repositorio git más tarde).

### No olvides confirmar cambios

Asegúrate de que, al haber terminado de migrar el código fuente a tu repositorio local de desarrollador. Por ejemplo:


```
git add --all
git commit -m "Initial migration step"
git push
```

Querrás hacer esto nuevamente (quizás varias veces) a medida que cambies los 'copybooks' también.

## Manejo de 'copybooks' (`/COPY` y `/INCLUDE`)

Una vez que el código fuente ha sido migrado, otra tarea tediosa es cambiar todos los copybooks para que apunten a tus archivos de flujo recién migrados. Tenemos la suerte de que los compiladores de C, RPG y COBOL para IBM i admiten la inclusión de archivos desde el IFS. En este capítulo, usaremos RPG ya que es el público objetivo principal de este libro.

Digamos que tenemos un programa que tiene declaraciones `/COPY` (o `/INCLUDE`) como las siguientes en la parte superior del código fuente:



```

      /COPY QRPGLEREF,OBJECTS
      /COPY QRPGLEREF,OBJECT
      /COPY QRPGLEREF,FORMATS
      /COPY QRPGLEREF,MEMBERS

      ** --------------------------

     D testproj        PI
     D    pLibrary                   10A   Const

      ** --------------------------
      
```

Aunque este código fuente podría estar en el IFS, `/COPY` (o `/INCLUDE`) aún puede traer código fuente de miembros fuente en el sistema de archivos QSYS (y viceversa). Lo que el desarrollador debería hacer es cambiar las declaraciones para usar una ruta relativa desde la raíz del proyecto hasta el archivo de flujo respectivo en el IFS. Por ejemplo, `/COPY QRPGLEREF,OBJECTS` podría traducirse a `/COPY './qrpgleref/objects.rpgle'`.


```
      /COPY `./qrplgeref/objects.rpgle`
      /COPY `./qrplgeref/object.rpgle`
      /COPY `./qrplgeref/formats.rpgle`
      /COPY `./qrplgeref/members.rpgle`
```

La razón por la que usas una ruta relativa a la raíz del proyecto es para que podamos construir desde la raíz del proyecto dentro de nuestra línea de comandos, IDE o nuestro sistema de compilación (que verás más adelante). No es necesario que lo hagas para todo tu código fuente de una vez, porque aún puedes depender de los miembros fuente existentes durante un período de migración, aunque **se recomienda que los cambies tan pronto como sea posible**. Aunque no es recomendable, puedes hacerlo de manera iterativa y cambiarlos cuando trabajes en el código fuente. Esto es peligroso porque los miembros fuente no están bajo control de cambios.

Si estás utilizando una herramienta de terceros, como HTTPAPI, que tiene sus encabezados en miembros fuente, entonces puedes dejar esas declaraciones `/COPY` (o `/INCLUDE`) junto con tus includes que apuntan al IFS:

```
      /COPY `./qrplgeref/objects.rpgle`
      /COPY `./qrplgeref/object.rpgle`
      /COPY `./qrplgeref/formats.rpgle`
      /COPY `./qrplgeref/members.rpgle`
      /COPY QRPGLEREF,HTTPAPI_H
```

## Compilación de fuentes en el IFS

Puedes compilar la mayoría de las fuentes fuera del IFS usando tu IDE o por la línea de comandos. La siguiente lista de comandos/compiladores tienen soporte para compilar fuentes fuera del IFS en IBM i con el parámetro `SRCSTMF`:

* `CRTBNDRPG` / `CRTRPGMOD`
* `CRTSQLRPGI`
* `CRTSRVPGM` (para fuentes de binder) - 7.2+
* `CRTBNDCL` / `CRTCLMOD` - 7.3+
* `RUNSQLSTM`
* `CRTBNDC` / `CRTCMOD`
* `CRTBNDCBL` / `CRTCBLMOD`

Cuando invoques los comandos de compilación, ya sea desde una shell 5250, pase shell o IDE, asegúrate de establecer el directorio de trabajo actual de los trabajos en la raíz/directorio del proyecto con el fin de que las declaraciones `/INCLUDE` y `/COPY` de las fuentes funcionen según lo previsto (como se muestra en el capítulo sobre copybooks).

Puedes cambiar tu directorio de trabajo en un trabajo 5250 usando `CD` o `CHGCURDIR`. También puedes cambiar tu directorio de trabajo en RDi y Code for IBM i al compilar fuentes. Al trabajar en pase, puedes usar `cd` para cambiar el directorio de trabajo.
