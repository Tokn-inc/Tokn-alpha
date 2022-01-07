// SPDX-License-Identifier: MIT

pragma solidity^0.8.0;

import "./ToknFactory.sol";



contract ToknITO{
    
    ToknFactory public toknFactory;
    UsdcToken public usdc;
    address payable public treasury;

    uint public treasuryPercentage = 5;

    enum State {Started, Running, Cancelled, Ended}
    
    struct ITOConfig{
        uint toknsAvailable;
        uint price;
        address[] investors;
        State itoState;
    }

    mapping(uint => mapping(address => uint)) public bookedTokns;
    mapping(uint => ITOConfig) public toknITOs;
    mapping(address => uint) public artistTracker;
    mapping(address => uint) public userTracker;
    
    address[] public artistList;
    address[] public userList;


    
    constructor(ToknFactory _toknFactory, UsdcToken _usdc){
        toknFactory = _toknFactory;
        usdc = _usdc;
        treasury = payable(msg.sender);
    }
    
    function setTreasuryPercentage(uint _pc) public {
        require(msg.sender == treasury, "Caller not authorized");
        treasuryPercentage = _pc;
    }

    function setTreasury(address _treasury) public {
        require(msg.sender == treasury, "Caller not authorized");
        treasury = payable(_treasury);
    }

    function getUsersCount() public view returns(uint){
        return userList.length;    
    }
    
    function isContract(address _addr) private view returns (bool){
      uint32 size;
      assembly {
        size := extcodesize(_addr)
      }
      return (size > 0);
    }
    
    function airdropTracker(uint _id, address _receiver, uint _price) internal {
        // if(_id == 1){
        //     require(msg.sender == toknFactory.deployer());
        // } else{
            address artist = toknFactory.toknIdToArtist(_id);
            require(artist == msg.sender || isContract(msg.sender));
            if(artistTracker[artist] == 0) {
                artistList.push(artist); 
            }
            artistTracker[artist] += _price;
        // }
        if(userTracker[_receiver] == 0) {
            userList.push(_receiver);
        }
        userTracker[_receiver] += _price;
    }
    

    function setToknPrice(uint _id, uint _price) public {
        
        require(toknFactory.toknIdToArtist(_id) == msg.sender && _price != 0);
        toknITOs[_id].price = _price*10**6;
    }
    
   
    
    function startITO(uint _id) public {
        
        require(toknFactory.toknIdToArtist(_id) == msg.sender && toknITOs[_id].price != 0);
        toknITOs[_id].itoState = State.Running;
        toknITOs[_id].toknsAvailable = toknFactory.balanceOf(msg.sender, _id);
    }
    
    function stopITO(uint _id) public {
        
        require(toknFactory.toknIdToArtist(_id) == msg.sender && toknITOs[_id].itoState== State.Running);
        toknITOs[_id].itoState = State.Ended;
    }    
    
    function getCurrentState(uint _id) public view returns(State) {
        
        return toknITOs[_id].itoState;
    }

    function getITO(uint _id) public view returns(ITOConfig memory) {
        return toknITOs[_id];
    }
    
    function investFixedPrice(uint _id, uint _qty) public{
        
        require(_qty <= toknITOs[_id].toknsAvailable && toknITOs[_id].itoState == State.Running);
        uint usdcAmount = _qty * toknITOs[_id].price;
        usdc.transferFrom(msg.sender, address(this), usdcAmount);
        toknITOs[_id].toknsAvailable -= _qty;
        toknITOs[_id].investors.push(payable(msg.sender));
        bookedTokns[_id][msg.sender] += _qty;
    }
    
    function allocateFixedPrice(uint _id) public{
        stopITO(_id);
        
        require(toknFactory.toknIdToArtist(_id) == msg.sender);
        require(toknITOs[_id].itoState == State.Ended);
        address[] memory toknInvestors = toknITOs[_id].investors;
        for(uint i = 0; i < toknInvestors.length; i++) {
            toknFactory.safeTransferFrom(msg.sender, toknInvestors[i], _id, bookedTokns[_id][toknInvestors[i]], "");
            uint amount = toknITOs[_id].price * bookedTokns[_id][toknInvestors[i]];
        uint treasury_amount = amount*treasuryPercentage/uint(100);
        uint artistAmount = amount - treasury_amount;
        usdc.transfer(treasury, treasury_amount);
          usdc.transfer(msg.sender, artistAmount);
            airdropTracker(_id, toknInvestors[i], amount);
        }
    }
    
   function getBookedToknsFor(address _investor, uint _id) public view returns (uint) {
       return bookedTokns[_id][_investor];
   }
    
}