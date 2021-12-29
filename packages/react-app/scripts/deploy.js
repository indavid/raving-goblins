const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const NFT = await hre.ethers.getContractFactory("NFT");
  //const nft = await NFT.deploy(nftMarket.address);
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("nft deployed to:", nft.address);

  let config = `

  export const nftaddress = "${nft.address}"

  `

  let data = JSON.stringify(config)
  fs.writeFileSync('./src/config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });