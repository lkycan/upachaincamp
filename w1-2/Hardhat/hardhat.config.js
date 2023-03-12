require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const mnemonic = process.env.MNEMONIC
const scankey = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
      },
      sepolia: {
      url: "https://sepolia.infura.io/v3/6a838a8ad80a4fd0b3c348bc3dd38cee",
      accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
      //   mnemonic: mnemonic,
      // },
      chainId: 11155111,
    },
    arbitrum:{
      url: "https://arbitrum-mainnet.infura.io/v3/6a838a8ad80a4fd0b3c348bc3dd38cee",
      accounts: {
        mnemonic: mnemonic,
      },
      chainId: 42161,
    }
  },

  abiExporter: {
    path: './deployments/abi',
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: true,
  },
  etherscan: {
      apiKey: scankey
  },
};
