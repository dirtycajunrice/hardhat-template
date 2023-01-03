import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';
import '@openzeppelin/hardhat-upgrades';
import "@dirtycajunrice/hardhat-tasks";
import { HardhatUserConfig } from "hardhat/config";
import { GetEtherscanCustomChains, GetNetworks } from "@dirtycajunrice/hardhat-tasks";

import "dotenv/config";
import "./tasks";

const settings = {
  optimizer: {
    enabled: true,
    runs: 200
  },
  outputSelection: {
    '*': {
      '*': ['storageLayout'],
    },
  },
}

const compilers = ["0.8.16", "0.8.9", "0.8.2", "0.6.0"].map(version => ({ version, settings }));

const networks = GetNetworks([process.env.PRIVATE_KEY])

const config: HardhatUserConfig = {
  solidity: { compilers },
  networks,
  etherscan: {
    apiKey: {
    },
    customChains: GetEtherscanCustomChains()
  }
};

export default config;