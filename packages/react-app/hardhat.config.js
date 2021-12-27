/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim() // || "a7f442a9089b4e56848787858b0cf14c" // account 1 private key
const projectId ="a7f442a9089b4e56848787858b0cf14c" //infura project ID


module.exports = {
  paths:{
    artifacts: './src/artifacts',
  },
  defaultNetwork: "hardhat",
  networks: {

    /*localhost: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [`${keylocal}`]
    },*/
    
    hardhat: {
      //url: "http://127.0.0.1:7545",
      chainId: 1337,
      //accounts: [`${keylocal}`]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    },
    ropsten: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`, 
      accounts: [privateKey]
     
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}