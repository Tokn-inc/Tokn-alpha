import { abi } from "./build/ToknBuy.json";
import web3 from "./web3";
const address = "0x9eab5ff9fd971547072a7925228e5d8428e31f88";
const contract = web3.eth.Contract(abi, address);
export default contract;
