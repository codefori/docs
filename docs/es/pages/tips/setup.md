# Soluciones a Errores en Code for IBM i

Esta página consta de correcciones para errores extraños que los usuarios reciben basados en la configuración del sistema.

## Error en la configuración de la terminal

Este error aparece cuando tienes líneas en los archivos de inicio que escriben en la salida estándar. Por lo general, el problema principal es cuando los siguientes comandos existen en el archivo `.bashrc` (archivo de inicio no interactivo).

- `echo`
- `liblist` - este es un nuevo comando bash en IBM i que agrega a la lista de bibliotecas, pero también escribe en la salida estándar.

Puedes ver el [problema original en GitHub](https://github.com/halcyon-tech/vscode-ibmi/issues/325):

> Este fue mi momento 'aha', ya que recientemente cambié mi archivo `~/.bashrc` en IBM i para generar alguna salida general. Y efectivamente, cuando cambio el archivo `~/.bashrc` entre escribir en stdout y no escribir en stdout, veo que el problema aparece/desaparece (respectivamente).
>
> La mejor solución, para mí, es mantener la inicialización de la terminal que escribe en stdout en mi archivo `~/.profile`, que no se ejecutará a través de una conexión SFTP. Sin embargo, esto está fuera del alcance de esta extensión.

## Sin resultados al ejecutar SQL

Cuando ejecutas una declaración SQL, no aparecen mensajes ni resultados. Esto ha estado sucediendo cuando el SSHD no se ha iniciado correctamente. Puedes ver en la salida de Code for IBM i algo como lo siguiente:


```
/home/NUJKJ: LC_ALL=EN_US.UTF-8 system "call QSYS/QZDFMDB2 PARM('-d' '-i' '-t')"
select srcdat, rtrim(srcdta) as srcdta from ILEDITOR.QGPL_QCLSRC_A_CHGUSR_C
{
"code": 0,
"signal": null,
"stdout": "DB2>",
"stderr": ""
}
```

### Solución potencial

Si ejecutas `ps -ef | grep sshd` y ves `/QOpenSys/usr/sbin/sshd`, este fix puede funcionar para ti.

1. Finaliza la instancia actual de SSHD: `ENDTCPSVR SERVER(*SSHD)`.
2. Inicia SSHD nuevamente: `STRTCPSVR SERVER(*SSHD)`.
3. En una terminal PASE, ejecuta `ps -ef | grep sshd`.

Ahora deberías ver que el SSHD se ha iniciado desde un lugar diferente.


```
$ ps -ef | grep sshd
 qsecofr    107      1   0   Jul 15      -  0:00 /QOpenSys/QIBM/ProdData/SC1/OpenSSH/sbin/sshd
```

The issue should now be resolved.

## Connection using SSH private key always fails 

On some platforms (e.g., Linux PopOS) your connection using SSH private key may fail with a message like:
```
Error while signing data with privateKey: error:06000066:public key routines:OPENSSL_internal:DECODE_ERROR
```
Esto puede ocurrir si las rutinas OpenSSL en tu plataforma utilizadas por Code for IBM i tienen problemas con el formato predeterminado de la clave pública.

### Solución mediante la creación de una copia de la clave privada en formato PEM

Puedes resolver esto creando una segunda instancia de tu clave pública existente en formato PEM para que esté junto a tu clave predeterminada. Por ejemplo, si tu clave pública es `$HOME/.ssh/id_rsa`, puedes hacer lo siguiente:
```
cd $HOME/.ssh
cp id_rsa id_rsa_original
ssh-keygen -p -f id_rsa -m PEM
mv id_rsa id_rsa.pem
mv id_rsa_original id_rsa
```
Ahora configura la conexión de Code for IBM i utilizando `id_rsa.pem` en lugar de `id_rsa`. De esta manera, tu clave original sigue estando allí para hacer conexiones como siempre, y tienes una nueva copia en formato PEM con la que las conexiones de Code for IBM i funcionan correctamente.
