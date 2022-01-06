import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Row, Card, Col, Input, List, Menu, Anchor } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import "./index.css";
import loader from './assets/loader.gif';
import background3 from "../static/bgs/bg3.gif";
import axios from "axios";
import { notification } from "antd";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Modal} from 'antd';
import WalletLink from "walletlink";
import "antd/dist/antd.css";
import Web3Modal from "web3modal";
import assets from "../assets.js";
import { Account, Address, AddressInput, Contract, Faucet, GasGauge, Header, Ramp } from "./index.js";
import { INFURA_ID, NETWORK, NETWORKS } from "../constants";
import { Transactor } from "../helpers";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import {
  useEventListener,
} from "eth-hooks/events/useEventListener";
import {
  useExchangeEthPrice,
} from "eth-hooks/dapps/dex";

import { useContractConfig } from "../hooks"
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Authereum from "authereum";

import { 
  nftaddress
} from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';

const { ethers } = require("ethers");

const { BufferList } = require("bl");
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require("ipfs-http-client");

const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

console.log("📦 Assets: ", assets);

/*
    Welcome to 🏗 scaffold-eth !
    Code:
    https://github.com/austintgriffith/scaffold-eth
    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram
    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)
    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS['rinkeby']; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;

// EXAMPLE STARTING JSON:
const STARTING_JSON = {
  description: "Octopus Game Participant 001",
  external_url: "http://ravinggoblins.io", // <-- this can link to a page for the specific file too
  image: "https://gateway.pinata.cloud/ipfs/QmciNrUkcmDF32HcDvvqqXz8XoMdczsCP3DVCgYfAyEYzR/1.png",
  name: "001",
  attributes: [
    {
      trait_type: "Rarity",
      value: "Legendary",
    },
  ],
};

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    console.log(content);
    return content;
  }
};

// 🛰 ethereum network providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
  : null;
const poktMainnetProvider = navigator.onLine ? new ethers.providers.StaticJsonRpcProvider("https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406") : null;
const mainnetInfura = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
  : null;
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

// Coinbase walletLink init
const walletLink = new WalletLink({
  appName: "coinbase",
});

// WalletLink provider
const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`, 1);

// Portis ID: 6255fb2b-58c8-433b-a2c9-62098c05ddc9
/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: "dark", // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: "https://polygon.bridge.walletconnect.org",
        infuraId: INFURA_ID,
        rpc: {
          1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          42: `https://kovan.infura.io/v3/${INFURA_ID}`,
          100: "https://dai.poa.network", // xDai
        },
      },
    },
    portis: {
      display: {
        logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
        name: "Portis",
        description: "Connect to Portis App",
      },
      package: Portis,
      options: {
        id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_5A7C91B2FC585A17", // required
      },
    },
    "custom-walletlink": {
      display: {
        logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
        name: "Coinbase",
        description: "Connect to Coinbase Wallet (not Coinbase App)",
      },
      package: walletLinkProvider,
      connector: async (provider, _options) => {
        await provider.enable();
        return provider;
      },
    },
    authereum: {
      package: Authereum, // required
    },
  },
});

// main react function for main page
function MintSection(props) {
  const mainnetProvider =
    poktMainnetProvider && poktMainnetProvider._isProvider
    ? poktMainnetProvider
    : scaffoldEthProvider && scaffoldEthProvider._network
    ? scaffoldEthProvider
    : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [minting, SetMinting] = useState(false);

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
    await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
    window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
      async function getAddress() {
      if (userSigner) {
          const newAddress = await userSigner.getAddress();
          setAddress(newAddress);
      }
      }
      getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
      userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  const contractConfig = useContractConfig();

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE: If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
      console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(readContracts, "RavingGoblins", "balanceOf", [address]);
  console.log("🤗 balance:", balance);

  // 📟 Listen for broadcast events
  const transferEvents = useEventListener(readContracts, "RavingGoblins", "Transfer", localProvider, 1);
  console.log("📟 Transfer events:", transferEvents);

  // 🧠 This effect will update yourRavingGoblins by polling when your balance changes
  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [yourRavingGoblins, setRavingGoblins] = useState();

  useEffect(() => {
      const updateRavingGoblins = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
          try {
            console.log("Getting token index", tokenIndex);
            const tokenId = await readContracts.RavingGoblins.tokenOfOwnerByIndex(address, tokenIndex);
            console.log("tokenId", tokenId);
            const tokenURI = await readContracts.RavingGoblins.tokenURI(tokenId);
            console.log("tokenURI", tokenURI);

            const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
            console.log("ipfsHash", ipfsHash);

            const jsonManifestBuffer = await getFromIPFS(ipfsHash);

            try {
                const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
                console.log("jsonManifest", jsonManifest);
                collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
            } catch (e) {
                console.log(e);
            }
          } catch (e) {
          console.log(e);
          }
      }
      setRavingGoblins(collectibleUpdate);
      };
      updateRavingGoblins();
  }, [address, yourBalance]);

  // 🧫 DEBUG 👨🏻‍🔬
  useEffect(() => {
      if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
      ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
       console.log("🔐 writeContracts", writeContracts);
      }
  }, [
      mainnetProvider,
      address,
      selectedChainId,
      yourLocalBalance,
      yourMainnetBalance,
      readContracts,
      writeContracts,
      mainnetContracts,
  ]);

  // Making sure wallet's network matches with website's network
  let networkDisplay = "";
  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
      const networkSelected = NETWORK(selectedChainId);
      const networkLocal = NETWORK(localChainId);
      if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
          <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
              message="⚠️ Wrong Network ID"
              description={
              <div>
                  You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                  HardHat.
                  <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
              }
              type="error"
              closable={false}
          />
          </div>
      );
      } else {
      networkDisplay = (
          <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
              message="⚠️ Wrong Network"
              description={
              <div>
                  You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                  <Button
                  onClick={async () => {
                      const ethereum = window.ethereum;
                      const data = [
                        {
                            chainId: "0x" + targetNetwork.chainId.toString(16),
                            chainName: targetNetwork.name,
                            nativeCurrency: targetNetwork.nativeCurrency,
                            rpcUrls: [targetNetwork.rpcUrl],
                            blockExplorerUrls: [targetNetwork.blockExplorer],
                        },
                      ];
                      console.log("data", data);

                      let switchTx;
                      // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
                      try {
                      switchTx = await ethereum.request({
                          method: "wallet_switchEthereumChain",
                          params: [{ chainId: data[0].chainId }],
                      });
                      } catch (switchError) {
                        // not checking specific error code, because maybe we're not using MetaMask
                        try {
                            switchTx = await ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: data,
                            });
                        } catch (addError) {
                            // handle "add" error
                        }
                      }
                      if (switchTx) {
                        console.log(switchTx);
                      }
                  }}
                  >
                  <b>{networkLocal && networkLocal.name}</b>
                  </Button>
              </div>
              }
              type="error"
              closable={false}
          />
          </div>
      );
      }
  } else {
      // displays the name of the etwork
      networkDisplay = (
        <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
            {targetNetwork.name}
        </div>
      );
  }

  const loadWeb3Modal = useCallback(async () => {
      const provider = await web3Modal.connect();
      setInjectedProvider(new ethers.providers.Web3Provider(provider));

      provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });

      provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
      });
  }, [setInjectedProvider]);

  useEffect(() => {
      if (web3Modal.cachedProvider) {
      loadWeb3Modal();
      }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
      setRoute(window.location.pathname);
  }, [setRoute]);

  let faucetHint = "";
  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  const [faucetClicked, setFaucetClicked] = useState(false);
  if (
      !faucetClicked &&
      localProvider &&
      localProvider._network &&
      localProvider._network.chainId === 31337 &&
      yourLocalBalance &&
      ethers.utils.formatEther(yourLocalBalance) <= 0
  ) {
      faucetHint = (
      <div style={{ padding: 16 }}>
          <Button
          type="primary"
          onClick={() => {
              faucetTx({
              to: address,
              value: ethers.utils.parseEther("0.01"),
              });
              setFaucetClicked(true);
          }}
          >
          💰 Grab funds from the faucet ⛽️
          </Button>
      </div>
      );
  }

  const [yourJSON, setYourJSON] = useState(STARTING_JSON);
  const [sending, setSending] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [ipfsDownHash, setIpfsDownHash] = useState();

  const [downloading, setDownloading] = useState();
  const [ipfsContent, setIpfsContent] = useState();

  const [transferToAddresses, setTransferToAddresses] = useState({});

  const [loadedAssets, setLoadedAssets] = useState();
  const [onSaleAssets, setOnSaleAssets] = useState([]);
  const[updateMe, setUpdate]=useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
      /*const updateRavingGoblins = async () => {
      const assetUpdate = [];
      const assetOnSale = [];
      for (const a in assets) {
          try {
          const forSale = await readContracts.RavingGoblins.forSale(ethers.utils.id(a));
          let owner;
          if (!forSale) {
              const tokenId = await readContracts.RavingGoblins.uriToTokenId(ethers.utils.id(a));
              owner = await readContracts.RavingGoblins.ownerOf(tokenId);
          } else {
              assetOnSale.push({ id: a, ...assets[a] });
          }
          assetUpdate.push({ id: a, ...assets[a], forSale, owner });
          } catch (e) {
          console.log(e);
          }
      }
      setLoadedAssets(assetUpdate);
      setOnSaleAssets(assetOnSale);
      };
      if (readContracts && readContracts.RavingGoblins) updateRavingGoblins();*/

     const cleanMe = GetForSale()
     return cleanMe

  }, [updateMe]);

  const GetForSale =async()=>{
          
    try {
     
        await axios.get(`https://ravinggoblings.herokuapp.com/api/getsomenfts`) 

          .then(function(response){

            setOnSaleAssets(response?.data)

            console.log("Dataaaaaaaaaaaaaaaaaaaaaaaaaa===================",response?.data)
          
          })

    } catch (error) {
        console.log(error)
    }

  }

  const UpdateForSale =async(uid)=>{
          
    try {
        const changeME= {uid:Number(uid)}

        console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEE=============", uid)

        await axios.post(`https://ravinggoblings.herokuapp.com/api/changetobought`, changeME) // save it into db

          .then(function(response){

            setUpdate(response)

            console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEE=============",response)
          
          })

    } catch (error) {
        console.log(error)
    }

  }

  const getRandomInt = max => {
      return Math.floor(Math.random() * max);
  };


  const ClaimNft = async() => {

      /* FIRST METHOD =========================== */

      SetMinting(true)

      
      
      try {

      
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)    
            const signer = provider.getSigner()
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)

            const rnd = getRandomInt(onSaleAssets?.length);

            console.log("== Random Mint ==>", rnd, onSaleAssets?.length);

            if (onSaleAssets.length > 0) {
        
            const url = `https://ipfs.io/ipfs/${onSaleAssets[rnd].ipfsurl}`

            const ipfshash =`${onSaleAssets[rnd].ipfsurl}`

            console.log("==============URL", url)

            let Nftprice = await contract.getPrice()

            Nftprice = Nftprice.toString()

            console.log("Listing price================================",Nftprice)

            const transaction = await contract.mintItem(url,ipfshash, {
              value: Nftprice
          
            })

            await transaction.wait().then(async() =>{

              await UpdateForSale(onSaleAssets[rnd].uid)

              notification.info({
                message: "Minting completed",
                placement: "bottomRight",
              });

            })


            }else{

              notification.error({
                message: "Minting period is over",
                placement: "bottomRight",
              });

            }

            SetMinting(false)

            handleCancel()

        
        
      } catch (error) {

        SetMinting(false)
 
        notification.error({
          message: `${error.message}`,
          placement: "bottomRight",
        });


        handleCancel()


        
      }
  

      /** SECOND METHOD 

      const rnd = getRandomInt(onSaleAssets.length);

      console.log("== Random Mint ==>", rnd, onSaleAssets.length);

      let url = `https://ipfs.io/ipfs/${onSaleAssets[rnd].ipfsurl}`


      if (onSaleAssets.length > 0) {

        tx(writeContracts.RavingGoblins.getPrice().then(function(res){

          console.log("Priceeeeeeeeeeeeeeeee=======================",res.toString())

          tx(writeContracts.RavingGoblins.mintItem(url, {

            value:res.toString(),
             gasLimit: 5050000,
            //gasPrice
   
            }));
  
  
        }))
      

      }*/
 

  }

  const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

  return (
    <div
      className="section"
      style={{
        backgroundImage: `url(${background3})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Row align="middle" style={{ marginBottom: '5em' }}>
        <Col span={2}>
          <div className="frontman" />
        </Col>
        <Col span={2}>
          <div className="triangle" />
        </Col>
        <Col span={2}>
          <div className="player-067" />
        </Col>
        <Col span={2}></Col>
        <Col span={8} align="middle">
          <div className="xs-title-logo" />
          <div className="gachapon" />
        </Col>
        <Col span={3}>
          <button className="pushable" style={{ marginTop: '40em', marginBottom: '2em' }}

              onClick={()=>{ClaimNft();showModal()}}

              disabled={minting?true:false}
          >
            <span className="front" style= {{ paddingLeft: '2.9em', paddingRight: '2.9em' }}>
                MINT 
            </span>
          </button>
          <button className="pushable" onClick={loadWeb3Modal}> 
            <span className="shadow"></span>
                <span className="front">CONNECT</span>
          </button> 
          <br />
          <div style={{fontSize:'14px', color:'white', textAlign:'center', justifyContent: 'center', height:'20px'}}> </div>
        </Col>
      </Row>

      <Modal title="Minting..." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
      
         footer={[
       
          ]}>

          <div style={{textAlign:'center'}}>
            <p>Minting your NFT please wait</p> <img src={loader} width="100"/>
          </div>

      </Modal>

    </div>
  )
}

export default MintSection;
