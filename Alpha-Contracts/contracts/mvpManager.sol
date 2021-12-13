//SPDX-License-Identifier:  MIT
pragma solidity ^0.8.0;

contract MVPManager{
      
  mapping(uint256 => uint256) public _totalMinted;

  constructor (){
      }

      function totalMinted(uint256 id) public view virtual returns (uint256) {
          return _totalMinted[id];
      }
}
