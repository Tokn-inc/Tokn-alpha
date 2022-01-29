import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0x24e59257cd9413608E56C1958D945E3fc3914252";

const factory = new web3.eth.Contract(abi, address);
export default factory;
