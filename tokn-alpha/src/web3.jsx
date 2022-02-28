import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || "https://polygon-rpc.com/")

export default web3;