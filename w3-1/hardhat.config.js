require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:1080");
setGlobalDispatcher(proxyAgent);

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const mnemonic = process.env.MNEMONIC
const scankey = process.env.ETHERSCAN_API_KEY
const apiUrl = process.env.API_URL
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
      dev: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
      chainId: 31337
      },
      ganache:{
        url: "http://127.0.0.1:7545",
        accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
        chainId: 1337
      },
      goerli: {
        url: apiUrl,
        accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
        //   mnemonic: mnemonic,
        // },
        chainId: 5,
      },
      sepolia: {
      url: "https://sepolia.infura.io/v3/6a838a8ad80a4fd0b3c348bc3dd38cee",
      accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
      //   mnemonic: mnemonic,
      // },
      chainId: 11155111,
    },
    // arbitrum:{
    //   url: "https://arbitrum-mainnet.infura.io/v3/6a838a8ad80a4fd0b3c348bc3dd38cee",
    //   accounts: {
    //     mnemonic: mnemonic,
    //   },
    //   chainId: 42161,
    // }
  },
  etherscan: {
    apiKey:scankey,
    // apiKey: {
    //   goerli: scankey,
    //   sepolia:scankey
    // }
  }

};
