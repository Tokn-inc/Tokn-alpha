import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0x7e0ad4fb27660d3c534f47b9405f5aee23a0aa7f";

const contract = new web3.eth.Contract(abi, address);
export default contract;
