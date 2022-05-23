const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');  //Variables obtenidas de la compilación necesarias para el despliegue
const urlProvider = 'http://localhost:8545';//Url del provedor (Ganache)
const mnemonic =  'lizard author dune eagle vacant naive motion memory keep quality exist panic'; //Frase semilla para importar las cuentas de ganache
const provider = new HDWalletProvider(mnemonic, urlProvider); // Instanciamos el proveedor
const web3 = new Web3(provider);

//Función  que desplegará nuestro contrato en la blockchain local que nos da Ganache
const deploy = async() => {
    const accounts = await web3.eth.getAccounts(); //Obtenemos las cuentas que se consiguen a traves de la frase semilla establecida

    //Argumentos para instanciar el contrato 
    const argumentsConstructor = [
        "Diego Bello",
        "DCOIN",
        18,
        21000000
    ]
    //Obtenemos el gas estimado que costará el despliegue
    const gasEstimate = await new web3.eth.Contract(abi)
    .deploy({
        data: bytecode,
        arguments: argumentsConstructor
    })
    .estimateGas({
        from:accounts[0]
    });
    //Realizamos el despliegue del contrato en la blockchain
    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode,
            arguments: argumentsConstructor
        })
        .send({
            gas:gasEstimate, 
            from:accounts[0]
        });//Enviamos transaccion firmada por la primera cuenta del array de cuentas obtenidas anteriormente
        console.log(JSON.stringify(result.options.jsonInterface)); //Cone sto veremos el abi del conrtato que acabamos de desplegar
        console.log('Contrato desplegado en la dirección: '+result.options.address); //Aquí veremos la cuenta que ha desplegado el contrato, por lo tanto la que tendra el total de los tokens
    };
    //Ejecutamos la función de despligue
    deploy();

    //Dirección del contrato que nos ha dado ganache al desplegar: 0x49460389da768f795096dc724a052644ee6e095f