import { useCallback, useEffect, useReducer, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import { claimABI } from "./claimABI";

// NFTs type:
export type Nfts = {
  [key: string]: {
    quantity: string;
    reward: string;
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
    : { leaf: null, nfts: null };
}

// Claim state interface:
interface ClaimState {
  tx?: string;
  claimData?: ClaimData;
  error?: Error;
  isLoading: boolean;
  isClaiming: boolean;
  isError: boolean;
  isEligible: boolean;
  isClaimed: boolean;
  isSuccess: boolean;
  status: "Loading" | "Claim" | "Claimed" | "Ineligible" | "Success" | "Error";
}

// Initial claim states:
const initialClaimState: ClaimState = {
  claimData: undefined,
  error: undefined,
  isError: false,
  isLoading: true,
  isClaiming: false,
  isEligible: false,
  isClaimed: false,
  isSuccess: false,
  status: "Loading",
};

// Action types:
type ClaimAction =
  | { type: "reset" }
  | { type: "claim" }
  | { type: "claiming" }
  | { type: "claimed" }
  | { type: "success"; tx: string }
  | { type: "eligible"; claimData: ClaimData }
  | { type: "ineligible" }
  | { type: "error"; error: Error };

// Reducer for claim states:
function claimReducer(state: ClaimState, action: ClaimAction) {
  switch (action.type) {
    case "reset":
      return initialClaimState;

    case "claim":
      state.status = "Claim";
      return {
        ...state,
        isLoading: false,
        isClaimed: false,
        isClaiming: false,
        isError: false,
      };

    case "claiming":
      return {
        ...state,
        isClaiming: true,
        isLoading: false,
        isError: false,
      };

    case "claimed":
      state.status = "Claimed";
      return {
        ...state,
        isClaimed: true,
        isClaiming: false,
        isLoading: false,
        isError: false,
      };

    case "success":
      state.status = "Success";
      return {
        ...state,
        isClaimed: true,
        isClaiming: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        tx: action.tx,
      };

    case "eligible":
      return { ...state, isEligible: true, claimData: action.claimData };

    case "ineligible":
      state.status = "Ineligible";
      return { ...state, isEligible: false, isLoading: false };

    case "error":
      state.status = "Error";
      return {
        ...state,
        error: action.error,
        isError: true,
        isLoading: false,
        isClaiming: false,
      };

    default:
      return state;
  }
}

// Custom react hook for getting claim data:
export default function useClaim(): ClaimState & {
  claim: () => void;
  retry: () => void;
} {
  const { address, isConnected } = useAccount();

  const [state, dispatch] = useReducer(claimReducer, initialClaimState);
  const [claimArgs, setClaimArgs] =
    useState<
      readonly [BigNumber, `0x${string}`, BigNumber, readonly `0x${string}`[]]
    >();

  const { config, refetch } = usePrepareContractWrite({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: claimABI,
    functionName: "claim",
    args: claimArgs,
    enabled: false,
  });

  const { writeAsync } = useContractWrite(config);

  // Claim function:
  const claim = useCallback((): void => {
    if (writeAsync) {
      dispatch({ type: "claiming" });

      writeAsync()
        .then((tx) => tx.wait())
        .then((txReceipt) => {
          dispatch({ type: "success", tx: txReceipt.transactionHash });
        })
        .catch((err) => {
          dispatch({ type: "error", error: err });
          console.error(err);
        });
    }
  }, [writeAsync]);

  // Prefetch Contract call when claimArgs are set:
  useEffect(() => {
    if (claimArgs) {
      refetch({ throwOnError: true })
        .then(() => {
          dispatch({ type: "claim" });
        })
        .catch((err) => {
          if (err.reason && err.reason.includes("AlreadyClaimed")) {
            dispatch({ type: "claimed" });
          } else {
            dispatch({ type: "error", error: err });
          }
        });
    }
  }, [claimArgs, refetch]);

  //Check for claim data
  const checkClaimData = useCallback((): void => {
    if (isConnected && address) {
      dispatch({ type: "reset" });
      getClaimData(address)
        .then((claimData) => {
          if (claimData.leaf) {
            setClaimArgs([
              BigNumber.from(claimData.leaf.index),
              address,
              BigNumber.from(claimData.leaf.amount),
              claimData.leaf.proof,
            ]);
            dispatch({ type: "eligible", claimData });
          } else {
            dispatch({ type: "ineligible" });
          }
        })
        .catch((err) => {
          dispatch({ type: "error", error: err });
          console.error(err);
        });
    } else {
      dispatch({ type: "reset" });
    }
  }, [address, isConnected]);

  // Check claim data on mount and when account changes:
  useEffect(() => {
    checkClaimData();
  }, [isConnected, address, checkClaimData]);

  return { ...state, claim, retry: checkClaimData };
}
