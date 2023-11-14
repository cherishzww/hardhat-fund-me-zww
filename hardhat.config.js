// require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.10",
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  networks: {
    // local:{
    //   url:"http://127.0.0.1:8545",
    //   chainId:31337,
    //   accounts:[process.env.PRIVATE_KEY]
    // },
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY],
    },
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/5SDrsuBbkOy92dWIvJMPe4UKVmz3O3Yh",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY],
      blockConfirmations: 6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      80001: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
};
