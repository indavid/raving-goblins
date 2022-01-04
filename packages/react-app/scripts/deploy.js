const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const NFT = await hre.ethers.getContractFactory("NFT");
  //const nft = await NFT.deploy(nftMarket.address);
  const nft = await NFT.deploy("0xCB74dc3CD5b0310f5a1005622c133deB8D1D9d40");
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