//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./toknFactory.sol";

contract ToknBuy is ToknFactory {

    uint price = 1;

    constructor(string memory _platformUri) ToknFactory(_platformUri) {
       
    }

    function buyTokn(uint _id, uint _qty) public {
        uint allowance = usdc.allowance(msg.sender, address(this));
        require(allowance >= _qty * price, "Allowance not sufficient for the transaction");
        _safeTransferFrom(toknIdToArtist[_id], msg.sender, _id, _qty, "");
        usdc.transferFrom(msg.sender, toknIdToArtist[_id], _qty * price);
    }

    function setPrice(uint _newPrice) public {
        price = _newPrice;
    }
}