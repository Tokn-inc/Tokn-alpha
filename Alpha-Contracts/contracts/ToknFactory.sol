// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

interface UsdcToken {
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
    function approve(address spender, uint tokens) external returns (bool success);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
}

contract ToknFactory is ERC1155{
  
    address payable public deployer;
    uint public toknId;

    // totalSupplies for every token
    mapping(uint => uint) public totalSupplies;
    mapping(uint => uint) public toknsAvailable;
    // maps token id to metadata uri
    mapping(uint => string) public toknIdToURI;

    mapping(string => uint) public symbolToId;
    
    //maps artist to his investor token
    mapping(address => uint[]) public artistTokns;
    mapping(uint => address) public toknIdToArtist;
   
    // mapping(address => uint[]) public nftBalances;
    mapping(uint => address[]) public addressTracker;

    UsdcToken public usdc;
    
    constructor(string memory _platformURI) ERC1155(_platformURI){
      deployer = payable(msg.sender);
      usdc = UsdcToken(0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b); //Rinkeby usdc address
    }
    
    modifier isToknOwner(uint _id, address _addr){
        require (toknIdToArtist[_id] == _addr);
        _;
    }
    
    //lets artist create his investor token
    function createInvestorTokns(string memory _symbol, uint _amount, string memory _uri) public {
        toknIdToArtist[++toknId] = msg.sender;
        symbolToId[_symbol] = toknId;
        artistTokns[msg.sender].push(toknId);
        toknIdToURI[toknId] = _uri;
        mintInvestorTokns(_amount, toknId);    
    }
    
    //lets artists mint more of his investor tokens
    function mintInvestorTokns(uint _amount, uint _toknId) public isToknOwner(_toknId, msg.sender){
        _mint(msg.sender, _toknId, _amount, bytes(toknIdToURI[_toknId]));
        totalSupplies[_toknId] += _amount;
        toknsAvailable[_toknId] += _amount;
    }
    
    function burnInvestorTokns(uint _amount, uint _toknId) public isToknOwner(_toknId, msg.sender){
        _burn(msg.sender, _toknId, _amount);
        totalSupplies[_toknId] -= _amount;
        toknsAvailable[_toknId] -= _amount;
    }    
    
    function returnAddressesForTokn(uint _id) public view returns(address[] memory){
        return addressTracker[_id];
    }
    
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override (ERC1155) {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
        addressTracker[id].push(to);
    }

}