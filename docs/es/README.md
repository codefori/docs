# Código para IBM i

## Extensión de desarrollo para IBM i en VS Code

Mantén y compila tu código RPGLE, CL, COBOL, C/CPP en IBM i directamente desde Visual Studio Code.

![intro_01.png](../assets/intro_01.png)

## Requisitos

- El demonio SSH debe estar iniciado en IBM i.
   - (El programa con licencia 5733-SC1 proporciona soporte para SSH.)
   - `STRTCPSVR *SSHD` inicia el demonio.
   - El usuario `QSSHD` está habilitado.
- Algo de familiaridad con VS Code. Puedes encontrar una introducción [aquí](https://code.visualstudio.com/docs/getstarted/introvideos).

Opcionalmente, asegúrate de saber cómo conectarte a PASE desde una terminal. Consulta la [documentación oficial de IBM i OSS](https://ibmi-oss-docs.readthedocs.io/en/latest/user_setup/README.html#step-1-install-an-ssh-client).

## Instalación

<!-- paneles:inicio -->

<!-- div:panel-izquierdo -->

Desde el Marketplace de Visual Studio Code: [Code for IBM i](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.code-for-ibmi)

O desde la vista de Extensiones dentro de Visual Studio Code.

<!-- div:panel-derecho -->

![../assets/install_01,png](../assets/install_01.png)

<!-- paneles:fin -->

### Extensiones Recomendadas

Se recomienda instalar también el [Paquete de Desarrollo IBM i](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.ibm-i-development-pack), un conjunto seleccionado de extensiones construidas sobre o que añaden valor a Code for IBM i. Esto incluye herramientas de base de datos, herramientas RPGLE, herramientas COBOL y más.

## Desarrollo de Extensiones

¡Consulta nuestra [documentación para desarrolladores](./pages/dev/getting_started.md)!

## Primeros Pasos

Para trabajar en esta documentación:

- clona el repositorio
- instala Docsify ```npm i docsify-cli -g```
- ejecuta localmente con ```docsify serve docs/```
- por defecto, se ejecuta en http://localhost:3000
- Lee más sobre [Docsify](https://docsify.js.org/#/)
