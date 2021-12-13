// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./mvpManager.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTSContract is ERC1155, Ownable, MVPManager {
  uint256 public constant SONG = 1;
  uint public rate = 4800000000000000; //in wei $20 eth
  uint public MAX_mint; //max 50
  //NFT Purchased EventEmitter
  event NFTPurchased(address _to, uint _count, uint _cost);

//Make sure to not mint more than MAX
    modifier saleIsOpen{
        require(totalMinted(SONG) <= MAX_mint, "Sale end");
        _;
    }
//deploy with site hosted site link
  constructor(uint _maxMint, string memory _baseURI)  ERC1155(_baseURI){
    //usdcContract = _usdcAddress;
    MAX_mint = _maxMint;
  }
  //Mints user bought NFT
  function mintMyNFT(address _account, uint _id, uint _quantity) public payable saleIsOpen onlyOwner {
        //check we haven't minted max yet
        require(totalMinted(_id) <= MAX_mint, "Sale end: max NFTS minted");
        //check current minting will not go over MAX
        require(totalMinted(_id) + _quantity <= MAX_mint, "Max limit reached");
        //can only mint  two per investor
        require(_quantity <= 2, "Only mint two NFTS per Investor");
        //check investor balance
        require(msg.value >= price(_quantity), "Value below price");
        //mint nft to investor account
        _mint(_account, _id, _quantity, " ");
        //update total minted countMinted
        _totalMinted[SONG] += _quantity;
        //emit Event
        emit NFTPurchased(_account, _quantity,price(_quantity));
    }
    //calculates total cost of purchase in WEI for now
    function price(uint _quantity) public view returns (uint256) {
          return rate * _quantity; // 0.0048 ETH
  }
}
//create mapping to hold (id => countMinted) public NFTSMinted
//I want to keep track of NFTS that have been minted so far..compare to max set during deployment
//A total minted smart contract that is inherited here, totalMinted() should return number of NFT (id) has been minted
//
