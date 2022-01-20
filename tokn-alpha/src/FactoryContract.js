import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0x921815C227BCa479F804EE31bA7F19CE9958f485";

const factory = new web3.eth.Contract(abi, address);
export default factory;
