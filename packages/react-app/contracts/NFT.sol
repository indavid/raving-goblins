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
  address  admin;
  uint256 public _possibleToMint = 2000;
  uint256 public price = 0.03 ether; 

  string[] public MintedNFTs;
  address payable _holderEth ;

 
  
  constructor (address _addr) ERC721("Raving Goblins ", "RGT") {
    _holderEth=payable(_addr);
    admin=(msg.sender);

  }

    function changeHolder(address _newaddr) public returns (bool) { // just in case we want to change the coinbase addr

         require(msg.sender==admin,"only the admin can change the holder");
          _holderEth=payable(_newaddr);
          return true;
    }

    function addnewNFT(string memory ipfs) internal {
  
        MintedNFTs.push(ipfs);
    }


    function MintIsAllowed(string memory ipfs) public view returns (bool) {
      for (
            uint256 allowedmint = 0;
            allowedmint < MintedNFTs.length;
            allowedmint++
        ) {
            if (keccak256(bytes(MintedNFTs[allowedmint])) == keccak256(bytes(ipfs))) {
                return false;
            }
        }
        return true;
    }


  function mintItem(string memory nftURI, string memory ipfshash)
      public
      payable
      nonReentrant 
      returns (uint256) {

      require(MintIsAllowed(ipfshash),"Not for sale, already minted");
      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == price,"unsufficient funds");
      require(_possibleToMint>0,"First drop is over");

      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(msg.sender, id);
      _setTokenURI(id, nftURI);

      _holderEth.transfer(msg.value);

      _possibleToMint--;

      addnewNFT(ipfshash);

      return id;
  }

  function giveAway(address _team, string memory nftURI, string memory ipfshash)  public returns (uint256) {

    require(msg.sender==admin,"only the Admin can give away some tokens");
    require(MintIsAllowed(ipfshash),"Not for sale, already minted");

    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    _mint(_team, id);
    _setTokenURI(id, nftURI);

    addnewNFT(ipfshash);
 
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



