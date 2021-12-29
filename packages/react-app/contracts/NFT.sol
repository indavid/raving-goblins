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
    address contractAddress;
    uint256 price = 0.03 ether; // all NFTs default price show be implemented in the smart contract not coming from frontend

    address public admin ;

    /* our team addresses */

    address teamM1 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;
    address teamM2 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;
    address teamM3 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;
    address teamM4 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;
    address teamM5 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;
    address teamM6 = 0x324a3D5951F94b40C566B180066D6B2ab7BE8D54;

    string  public baseUrl ="https:/dsdsdsdsddsdsd/";

  constructor () ERC721("Raving Goblins ERC-721 token", "RGT") {
 
    admin = msg.sender;

   /* let's give to the team for hardships*/

    _mintNft(teamM1); 
    _mintNft(teamM2); 
    _mintNft(teamM3); 
    _mintNft(teamM4); 
    _mintNft(teamM5); 
    _mintNft(teamM6); 
    
   
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


 function _mintNft(address t) internal { 
    
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(t, newItemId);

    _setTokenURI(newItemId, string(abi.encodePacked(baseUrl,Strings.toString(newItemId)))); // may add rendomness here
      
    
  }


  function _claimNft() public payable nonReentrant {

    require(msg.value >= price, "Unsufficient balance");

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    
    string memory _URI = string (abi.encodePacked(baseUrl,Strings.toString(newItemId))); // may add randomness here, get a random number from frontend and pass it to this function

    _setTokenURI(newItemId, _URI);

    payable(admin).transfer(price); // send that 0.03 Eth to the contract owner

    
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



