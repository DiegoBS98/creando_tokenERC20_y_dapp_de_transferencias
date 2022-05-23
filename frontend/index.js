const addressContact = "0x82903676d489f4bb18C7dD7E8EE37e91c736AA21"; //Dirección del contrato desplegado
//Abi del contrato desplegado
const abi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"uint256","name":"suply_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xdd62ed3e"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x70a08231"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x313ce567"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x06fdde03"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x95d89b41"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x18160ddd"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"}];
//Instanciamos sweet alert para mostrar alertas
const Toast = swal.mixin({
    toast:true,
    position:'bottom-end', 
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:false
});

let web3; //variable para instanciar web 3
let account; //cuenta logada en el aplicativo
let MyCoin; //variable donde se instancia el contrato con el que interactua la aplicación

/**
 * Función que detecta si el usuario tiene metamask y le añade el escuchador al botón de conexión con metamask
 */
function init(){
    //Si existe metamask...
    if(typeof window.ethereum !== 'undefined'){
        //Ocultamos boton de conectar con metamask
        const metamaskBtn = document.getElementById('enableEthereumButton');
        metamaskBtn.classList.remove('d-none'); 

        metamaskBtn.addEventListener('click', async() =>{
            //Solicitamos conexión con metamask
            const accounts = await ethereum.request({method: 'eth_requestAccounts'}); 
            //Guaradmos la cuenta logada                 
            account = accounts[0];
            //Ocultamos el botón
            metamaskBtn.classList.add('d-none');
            //Añadimos la cuenta a la pantalla
            document.getElementById('accountSelected').innerHTML = account;
            document.getElementById('accountSelected').classList.add('border');
            //Notificamos al usuario
            Toast.fire({
                icon:'success',
                title: 'Cuenta conectada',

            });
            //Invocamos función que detecta cambios
            detectChangeAccount();
            //Invocamos función que instancia el contrato con el que interactua la aplicación
            contract();
        })
    }
    /**
     * Función que detecta los cambios de cuenta
     */
    function detectChangeAccount(){
        window.ethereum.on('accountsChanged', function(accounts){
            console.log(accounts);
            account = accounts[0];
            document.getElementById('accountSelected').innerHTML = account;

            Toast.fire({
                icon:'success',
                title: 'Cuenta conectada',
            });
        })
    }

    /**
     * Funcion que instancia el contrato a utilizar e invoca a la funcion de inrteractuar
     */
    function contract(){
            web3 = new Web3(window.ethereum);
            MyCoin = new web3.eth.Contract(abi, addressContact);

            interact();
    }

    /**
     * Función que interactuará con el contrato desplegado en la blockchain
     */

    function interact(){
        //Obtenemos el botón de obtener balance
        const btnGetBalance = document.getElementById('btnGetBalance');
        //Añadimos un escuchador al boton de obtener balance que...
        btnGetBalance.addEventListener('click', ()=>{
            //Obtenemos la dirección de la que obtener el balance
            const address = document.getElementById('addressGetBalance'); 
            const value = address.value; 
            //Invocamos al metodo del contrato que nos devuelve el balance en Weis
            MyCoin.methods.balanceOf(value).call().then(res =>{
                //Convertimos los Weis  Ethers o DCOINS en este caso
                const amount = web3.utils.fromWei(res,'ether');
                //Pintamos balance por pantalla
                const valueSpan = document.getElementById('balance');
                valueSpan.innerHTML = amount;
            })
        });
        //Añadimos escuchador al boton de enviar que...
        const transfer = document.getElementById('transferir');
        transfer.addEventListener('click',  ()=>{
            //Obtiene el la dirección a la que enviar y la cantidad de DCOINS 
            const address = document.getElementById('addressBeneficiaria');
            const addressValue = address.value;
            const amount = document.getElementById('cantidad');
            const amountString = amount.value.toString();
            //Convertimos la cantidad a weis
            const amountTransfer = web3.utils.toWei(amountString, 'ether');
            //Invocamos al metodo del contrato que realiza la transferencia
            MyCoin.methods.transfer(addressValue, amountTransfer).send({from:account}).then(res =>{
                address.value = '';
                amount.value = 0;

                Toast.fire({
                    icon:'success',
                    title:'Transferencia realizada'
                });
            });  
        });
    }
}
//Cuando la pagina cargue, ejecutamos la funcion init
window.onload = init();