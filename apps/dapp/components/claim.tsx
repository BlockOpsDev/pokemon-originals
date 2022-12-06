import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Connect from "./connect";

type Leaf = {
  proof: string[];
  amount: BigNumber;
} | null;

async function getLeaf(address: string): Promise<Leaf> {
  const response = await fetch(`/api/proof/${address}`);
  const leaf = await response.json();
  return leaf.proof && leaf.amount ? leaf : null;
}

export default function Claim() {
  const { address, isConnected } = useAccount();
  const [leaf, setLeaf] = useState<Leaf | null>(null);

  useEffect(() => {
    async function checkLeaf() {
      if (isConnected && address) {
        const leaf = await getLeaf(address);
        setLeaf(leaf);
      }
    }
    checkLeaf();
  }, [isConnected, address]);

  if (!isConnected) {
    return <Connect />;
  }

  return (
    <button
      className={
        leaf
          ? "bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          : "bg-gray-600 text-gray-400 rounded-lg px-4 py-2"
      }
      disabled={!leaf}
    >
      {leaf ? "Claim" : "Ineligible"}
    </button>
  );
}
