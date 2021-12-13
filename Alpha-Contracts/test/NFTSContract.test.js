const NFTSContractInstance = artifacts.require("./NFTSContract.sol");
//const XToken = artifacts.require("./xToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}


contract('NFT CONTRACT', function(accounts){

  let nftsContractInstance,admin,investor

  before(async () => {
    nftsContractInstance = await NFTSContractInstance.deployed(20, 'http//:testAlpha')
    //tokenSale = await TokenSale.deployed(xToken.address, tokenPrice)
  })

  describe('deployment', async() => {

    it('deploys succesfully', async () => {
      const address = await NFTSContractInstance.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
      //it facilitates buying tokens
    it('it facilitates buying NFT', async () =>{
       admin = accounts[0];
        quantityToBuy = 2;
       totalPrice = 0.0048 * quantityToBuy;
       investor = accounts[1];
      nftPurchase = await nftsContractInstance.mintMyNFT(investor, 1, quantityToBuy, {from: admin, value:tokens(totalPrice.toString())})
      investorBal = await nftsContractInstance.balanceOf(investor, 1)
      assert.equal(investorBal.toNumber(), 2, "it updates tokens sold")

    })
  //})
})

})
