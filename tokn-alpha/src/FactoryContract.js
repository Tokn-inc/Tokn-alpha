import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0xf33A46af5EfB5097042fd99e8753efEBf201696d";

const factory = new web3.eth.Contract(abi, address);
export default factory;
