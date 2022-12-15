import { BigNumber, utils } from "ethers";
import BalanceTree from "./balance-tree";

const { isAddress, getAddress } = utils;

type Nfts = { [key: string]: { quantity: string; reward: string } };

type claims = {
  [key: `0x${string}`]: {
    totalReward: string;
    nfts: Nfts;
  };
};

type ClaimData = {
  leaf: {
    index: number;
    amount: string;
    proof: string[];
  };
  nfts: Nfts;
};

interface MerkleDistributorInfo {
  merkleRoot: string;
  tokenTotal: string;
  claims: {
    [account: string]: ClaimData;
  };
}

export function parseBalanceMap(balances: claims): MerkleDistributorInfo {
  const dataByAddress = Object.entries(balances).reduce<{
    [address: string]: {
      amount: BigNumber;
      nfts: Nfts;
    };
  }>((memo, [account, { totalReward, nfts }]) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`);
    }

    const parsed = getAddress(account);
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`);
    const parsedNum = BigNumber.from(totalReward);
    if (parsedNum.lte(0))
      throw new Error(`Invalid amount for account: ${account}`);

    memo[parsed] = { amount: parsedNum, nfts: nfts };
    return memo;
  }, {});

  const sortedAddresses = Object.keys(dataByAddress).sort();

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => ({
      account: address,
      amount: dataByAddress[address].amount,
    }))
  );

  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: ClaimData;
  }>((memo, address, index) => {
    const { amount, nfts } = dataByAddress[address];
    memo[address] = {
      leaf: {
        index,
        amount: amount.toHexString(),
        proof: tree.getProof(index, address, amount),
      },
      nfts: nfts,
    };
    return memo;
  }, {});

  const tokenTotal = sortedAddresses.reduce<BigNumber>(
    (memo, key) => memo.add(dataByAddress[key].amount),
    BigNumber.from(0)
  );

  return {
    merkleRoot: tree.getHexRoot(),
    tokenTotal: tokenTotal.toHexString(),
    claims,
  };
}
