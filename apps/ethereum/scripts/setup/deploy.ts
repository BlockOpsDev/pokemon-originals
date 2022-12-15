import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import fs from "fs";
import { MockERC20 } from "../../typechain-types";

async function main() {
  // Deploy Mock ERC20
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockERC20: MockERC20 = await MockERC20.deploy(
    // ERC20 Name
    "WETH",
    // ERC20 Symbol
    "WETH",
    // Amount of tokens to mint
    0
  );
  await mockERC20.deployed();
  console.log(`mockERC20 deployed to: ${mockERC20.address}`);

  // Read merkle tree from file
  const merkleTree = JSON.parse(
    fs.readFileSync("./scripts/data/merkleDistribution.json", "utf8")
  );
  // Deploy MerkleDistributor
  const MerkleDistributorWithDeadline = await ethers.getContractFactory(
    "MerkleDistributorWithDeadline"
  );
  const merkleDistributorWithDeadline =
    await MerkleDistributorWithDeadline.deploy(
      // ERC20 token address
      mockERC20.address,
      // Merkle root
      merkleTree.merkleRoot,
      // End time
      1688493524
    );
  await merkleDistributorWithDeadline.deployed();
  console.log(
    `merkleDistributorWithDeadline deployed to: ${merkleDistributorWithDeadline.address}`
  );

  await mockERC20.setBalance(
    merkleDistributorWithDeadline.address,
    BigNumber.from(merkleTree.tokenTotal)
  );
  console.log(
    `mockERC20 balance of merkleDistributorWithDeadline: ${await mockERC20.balanceOf(
      merkleDistributorWithDeadline.address
    )}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
