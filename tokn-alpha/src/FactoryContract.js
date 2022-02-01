import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0xB5F322919A2874E76Ae564647f67B903de806570";

const factory = new web3.eth.Contract(abi, address);
export default factory;
