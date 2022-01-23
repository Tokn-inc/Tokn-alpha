import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0x21Eb4F591fb8173C592aD3DFAB851a3b6220A556";

const factory = new web3.eth.Contract(abi, address);
export default factory;
