## Creando nuestro token ERC20 y nuestra aplicación descentralizada para realizar transferencias del token

En este proyecto, se lleva a cabo la creación de un **token ERC20 ("DCOIN")**.
Este token es desplegado en la blockchain local que nos ofrece **Ganache**.
También, contiene un **aplicativo descentralizado** que nos permite realizar transferencias con nuestro token utilizando metamask

### Pre-requisitos:
  - Tener instalado Ganache para poder ejecutar una blockchain local
  - Tener instalado el gestor de paquetes NPM
  - Tener metamask en el navegador
### Instalación
  - Descargamos el código de GitHub
  - Ejecutamos `npm install` en la carpeta del proyecto
  - Ejecutamos `ganache-cli` en un CMD para levantar Ganache.
  - Copiamos la primera address, junto con su clave privada y la frase semilla que corresponde a las 10 cuentas de ejemplo.
  - Abrimos metamask e importamos la cuenta a través de la clave privada anterior.
  - En el archivo `deploy.js` , pegamos la frase semilla anterior en la variable `mnemonic`.
  - Ejecutamos `npm run compile` para compilar nuestro contrato inteligente.
  - Ejecutamos `npm run deploy` para desplegar el contrato en nuestra blockchain local (Ganache)
  - Copiamos la address que nos saldrá por consola, que es la que pertenece al contrato y la pegamos en la variable `addressContract` de `index.js`.
  - Copiamos el código ABI del contrato que también mostramos en consola y lo pegamos en la variable `abi` de `index.js`.
### Levantar el proyecto
  - Levantamos nuestro aplicativo ejecutando `npm run dev`
