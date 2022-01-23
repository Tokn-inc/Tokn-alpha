import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0xca273754BcC7E7eb64502231B9877A579BE4dB89";

const contract = new web3.eth.Contract(abi, address);
export default contract;
