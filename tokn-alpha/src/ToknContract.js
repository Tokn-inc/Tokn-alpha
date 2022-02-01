import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0x8cB03550F4502f8b812e020a087dD440e82Fedfa";

const contract = new web3.eth.Contract(abi, address);
export default contract;
