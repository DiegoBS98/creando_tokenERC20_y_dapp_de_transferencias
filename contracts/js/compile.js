const path = require('path'); //Modulo para poder acceder a la ruta de MyCoin.sol
const fs = require('fs'); //Modulo para poder leer el codigo que haya en el archivo a compilar
const solc = require('solc'); // Compilador a bytecode
//Obtenemos el código del contrato
const MyCoinPath = path.join(__dirname, '../MyCoin.sol');
const code = fs.readFileSync(MyCoinPath, 'utf8');
//Establecemos los parametros de compilación
var input = {
    language: 'Solidity',
    sources: {
        'MyCoin.sol': {
            content: code
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input))); //Compilamos el contrato y guardamos la salida 
//Exportamos las variables necesarias para el deploy
module.exports = {
    abi: output.contracts['MyCoin.sol'].MyCoin.abi,
    bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}