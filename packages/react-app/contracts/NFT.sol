// SPDX-License-Identifier: Raving Goblings and MIT
pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import "hardhat/console.sol";


contract NFT is ERC721Enumerable, ERC721URIStorage, AccessControlEnumerable,ReentrancyGuard  {

   using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address payable admin;
  uint256 internal _possibleToMint = 2000;
  uint256 public price = 0.03 ether; 
 
  
  constructor () ERC721("Raving Goblins ERC721 Token", "RGT") {

    admin=payable(msg.sender);

  }

  function mintItem(string memory nftURI)
      public
      payable
      nonReentrant 
      returns (uint256) {

      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == price,"unsufficient funds");
      require(_possibleToMint>0,"First drop is over");

      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(msg.sender, id);
      _setTokenURI(id, nftURI);

      admin.transfer(msg.value);

      _possibleToMint--;

      return id;
  }

  function giveAway(address _team, string memory nftURI)  public returns (uint256) {

    require(msg.sender==admin,"only the Admin can give away some tokens");

    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    _mint(_team, id);
    _setTokenURI(id, nftURI);
 
    return id;
  }

  function changePrice(uint256 _newPrice)  public returns (bool) {
    require(msg.sender==admin,"only the Admin can change the price");
    price=_newPrice;
    return true;
  }

  function getPrice() public view returns (uint256) {
    return price;
  }

  function changePossibleToMint(uint256 _newValue)  public returns (bool) {
    require(msg.sender==admin,"only the Admin can change this number");
    _possibleToMint=_newValue;
    return true;
  }  

  function withEth(address payable _addr)  public returns (bool)  {

    require(msg.sender==admin,"only the Admin can withdraw");
    _addr.transfer(address(this).balance);
    return true;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerable, ERC721, ERC721Enumerable) returns (bool) {
   
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
  
    return ERC721URIStorage.tokenURI(tokenId);
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Enumerable) {
   
    super._beforeTokenTransfer(from, to, tokenId);
  }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
   
    return ERC721URIStorage._burn(tokenId);
  }



}



