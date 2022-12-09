import { useEffect, useReducer, useState } from "react";
import { useAccount } from "wagmi";
import {
  prepareWriteContract,
  SendTransactionResult,
  writeContract,
} from "@wagmi/core";
import { BigNumber } from "ethers";
import { claimABI } from "./claimABI";

// NFTs type:
export type Nfts = {
  [key: string]: {
    quantity: string;
    amount: string;
  };
};

// Leaf type:
export type Leaf = {
  index: number;
  proof: `0x${string}`[];
  amount: string;
};

// Claim data type:
export type ClaimData = {
  leaf: Leaf;
  nfts: Nfts;
};

// Fetch claim data from API:
async function getClaimData(address: string): Promise<ClaimData> {
  const response = await fetch(`/api/claim/${address}`);
  const claimData = await response.json();
  return claimData.leaf && claimData.nfts
    ? claimData
    : { leaf: null, nfts: {} };
}

// Prepare claim contract write transaction:
async function prepareClaimTx(
  address: `0x${string}`,
  leaf: Exclude<Leaf, null>
): Promise<() => Promise<SendTransactionResult>> {
  const config = await prepareWriteContract({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: claimABI,
    functionName: "claim",
    args: [
      BigNumber.from(leaf.index),
      address,
      BigNumber.from(leaf.amount),
      leaf.proof,
    ],
  });
  // Return prepared contract write transaction:
  return () => writeContract(config);
}

// Claim state interface:
interface ClaimState {
  claimData?: ClaimData;
  isLoading: boolean;
  isClaiming: boolean;
  isError: boolean;
  isEligible: boolean;
  isClaimed: boolean;
  claimTx?: () => Promise<SendTransactionResult>;
}

// Initial claim states:
const initialClaimState: ClaimState = {
  isLoading: true,
  isClaiming: false,
  isError: false,
  isEligible: false,
  isClaimed: false,
};

// Action types:
type ClaimAction =
  | { type: "reset" }
  | { type: "claim"; claimTx: () => Promise<SendTransactionResult> }
  | { type: "claimed" }
  | { type: "eligible" }
  | { type: "ineligible" }
  | { type: "claiming" };

// Reducer for claim states:
function claimReducer(state: ClaimState, action: ClaimAction) {
  switch (action.type) {
    case "reset":
      return initialClaimState;
    case "claim":
      return { ...state, claimTx: action.claimTx, isLoading: false };
    case "claiming":
      return { ...state, isClaiming: true };
    case "claimed":
      return { ...state, isClaimed: true, isClaiming: false, isLoading: false };
    case "eligible":
      return { ...state, isEligible: true };
    case "ineligible":
      return { ...state, isEligible: false, isLoading: false };
    default:
      return state;
  }
}

// Custom react hook for getting claim data:
export default function useClaim(): ClaimState {
  // Claim reducer:
  const [state, dispatch] = useReducer(claimReducer, initialClaimState);
  // Wagmi account hook:
  const { address, isConnected } = useAccount();

  // Check claim data on mount and when account changes:
  useEffect(() => {
    async function checkClaimData() {
      if (isConnected && address) {
        dispatch({ type: "reset" });
        const claimData = await getClaimData(address);

        if (claimData.leaf) {
          dispatch({ type: "eligible" });
          prepareClaimTx(address, claimData.leaf)
            .then((claimTx) => {
              dispatch({
                type: "claim",
                claimTx: async () => {
                  dispatch({ type: "claiming" });
                  const tx = claimTx();
                  (await tx).wait();
                  dispatch({ type: "claimed" });
                  return tx;
                },
              });
            })
            .catch((e) => {
              dispatch({ type: "claimed" });
              console.error(e);
            });
        } else {
          dispatch({ type: "ineligible" });
        }
      }
    }
    checkClaimData();
  }, [isConnected, address]);
  return state;
}
