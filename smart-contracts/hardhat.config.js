require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify"); 
require('dotenv').config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,  // Infura endpoint for Sepolia
      accounts: [process.env.PRIVATE_KEY_1],  
    }
  },
  solidity: {
    version: "0.8.27",  
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY  
  },
  mocha: {
    timeout: 40000  // Mocha timeout setting
  }
};
