const NFTSContractInstance = artifacts.require("NFTSContract.sol");
const MVPManagerInstance = artifacts.require("mvpManager.sol");

function tokens(n){
  return web3.utils.toWei(n, 'ether');
}

module.exports = async function (deployer, network, accounts) {
  //deploy mvpManager contract
   await deployer.deploy(MVPManagerInstance);
  //deploy central token
  await deployer.deploy(NFTSContractInstance, 20, "http base uri");
  const nftsContractInstance = await NFTSContractInstance.deployed()

    await nftsContractInstance.mintMyNFT(accounts[0],1,2, {from:accounts[0], value:tokens('0.0097')});
};
