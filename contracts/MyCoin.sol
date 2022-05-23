//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Interfaz que implementará nuestro token ERC20
interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

//Contrato del token ERC20
contract MyCoin is IERC20 {
    
    address private owner; // Cartera que despliegue el contrato
    string public name; //Nombre del token
    string public symbol;  //Simolo del token
    uint8 public decimals; //Decimales del token
    mapping(address => uint256) private _balances; //Mapeo de carteras con sus balances
    mapping(address => mapping(address => uint256)) private _allowed;
    uint256 private _totalSupply; //Cantidad total de tokens

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 suply_
        ) {
        name = name_;
        symbol =symbol_;
        decimals = decimals_;
        _totalSupply = suply_ * (uint256(10) ** decimals);
        owner = msg.sender;
        _balances[msg.sender] = _totalSupply;
    } 

    //Obtener el total supply del contrato
    function totalSupply() public view override returns(uint256) {
        return _totalSupply;
    }

    //Obtener el balance actual del contrato
    function balanceOf(address _owner) public view override returns(uint256) {
        return _balances[_owner];
    }
    //Saber los tokens que el usuario ha autorizado a manejar
    function allowance(address _owner, address spender) public view override returns(uint256){
        return _allowed[_owner][spender];
    }
    //Transferencia de tokens 
    function transfer(address to, uint256 value) public override returns(bool){
        require(value <= _balances[msg.sender]);//Confirmamos que los tokens que se quieren enviar estan disponibles en la wallet del usuario
        require(to != address(0)); //Confirmamos que la dirección de envio sea distinta a la de recepción

        _balances[msg.sender] -= value; //Descontamos los tokens al usuario emisor
        _balances[to] += value; //Añadimos al usuario receptor
        emit Transfer(msg.sender, to, value); //Emitimos el evento de transferncia
        return true;
    }
    //Aprovación de permisos para manejar esos tokens
    function approve(address spender, uint256 value) public override returns(bool){

        require(spender != address(0)); //Confirmamos que la dirección de envio sea distinta a la de recepción

        _allowed[msg.sender][spender] = value; //Añadimos los tokens a los que el usuario ha dado permiso

        emit Approval(msg.sender, spender, value); //Emitimos el evento 
        return true;
    }

    //Envío de tokens
    function transferFrom(address from,address to, uint256 value) public override returns(bool){

        require(value <= _balances[from]); //Confirmamos que los tokens que se quieren enviar estan disponibles en la wallet del usuario
        require(value <= _allowed[from][msg.sender]);
        require(to != address(0)); //Confirmamos que la dirección de envio sea distinta a la de recepción

        _balances[from] -= value; //Descontamos los tokens al usuario emisor
        _balances[to] += value; //Añadimos al usuario receptor
        _allowed[from][msg.sender] -= value; //Restamos los tokens que tiene permiso a manejar
        emit Transfer(from, to, value); //Emitimos el evento de transferncia
        return true;
    }
}
