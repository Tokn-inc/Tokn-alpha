import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0x34e45d03377821F766BF5b2D6Df834FDd5C31724";

const contract = new web3.eth.Contract(abi, address);
export default contract;
