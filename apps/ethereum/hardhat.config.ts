import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    },
    testnet: {
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
