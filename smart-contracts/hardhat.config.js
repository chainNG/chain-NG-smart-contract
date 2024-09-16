require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",  // Ensure this matches your Solidity version
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/5942bc7bb9274ba4a927c440f9697a7f`,
      accounts: [``]  // Add your private key, preferably via an environment variable
    }
  },
  etherscan: {
    apiKey: "YOUR_POLYGONSCAN_API_KEY"  // Optional, for verifying the contract on Polygonscan
  }
};
