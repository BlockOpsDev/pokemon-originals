import { ethers } from "hardhat";

const Networks = {
  1337: "local",
  137: "mainnet",
  80001: "testnet",
} as const;

type ChainId = keyof typeof Networks;

export const getEnviroment = async (): Promise<typeof Networks[ChainId]> => {
  const { chainId } = await ethers.provider.getNetwork();
  return Networks[<ChainId>chainId];
};
