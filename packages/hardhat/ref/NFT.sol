// SPDX-License-Identifier: Raving Goblings and MIT
pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";


contract NFT is ERC721Enumerable, ERC721URIStorage, AccessControlEnumerable, Pausable, Ownable, ERC721Burnable, ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 price = 0.03 ether; // all NFTs default price show be implemented in the smart contract not coming from frontend

    address public admin ;

    string  baseUrl ="";

  constructor (string _baseUrl) ERC721("Raving Goblins ERC-721 token", "RGT") {
 
    admin = msg.sender;

    baseUrl=_baseUrl;
   
  }

  function getPrice()public view returns(uint256){

  return price;

  }

  function changePrice(uint256 _newPrice) onlyOwner public returns (bool)  {

    price=_newPrice;
    return true;

  }

 function changeUrl(string memory _newUrl)  onlyOwner public returns (bool) {

    baseUrl=_newUrl;
    return true;

  }


  function mintItem(uint256 _randomNumber) public payable nonReentrant {

    require(msg.value >= price, "Unsufficient balance");

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    
    string memory _URI = string (abi.encodePacked(baseUrl,Strings.toString(_randomNumber))); // may add randomness here, get a random number from frontend and pass it to this function

    _setTokenURI(newItemId, _URI);

    payable(admin).transfer(price); // send that 0.03 Eth to the contract owner

    
  }

  function giveAway(address _team, uint256 _randomNumber) onlyOwner public view returns (bool){

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(_team, newItemId);
    string memory _URI = string (abi.encodePacked(baseUrl,Strings.toString(_randomNumber))); // may add randomness here, get a random number from frontend and pass it to this function

    _setTokenURI(newItemId, _URI);
   
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


  function pause() public onlyOwner{

        _pause();
  }


  function unpause() public onlyOwner{

        _unpause();
  }


}



