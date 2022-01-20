import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0xE59486C5f7d2CE947Aa2e3EC723Ad5aBe282d021";

const contract = new web3.eth.Contract(abi, address);
export default contract;
