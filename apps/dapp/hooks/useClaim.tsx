import { useCallback, useEffect, useReducer } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
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

type claimArgs = readonly [
  BigNumber,
  `0x${string}`,
  BigNumber,
  readonly `0x${string}`[]
];

// Claim state interface:
interface ClaimState {
  claimData?: ClaimData;
  args?: claimArgs;
  error?: Error;
  isLoading: boolean;
  isClaiming: boolean;
  isError: boolean;
  isEligible: boolean;
  isClaimed: boolean;
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
  | { type: "claim" }
  | { type: "claimed" }
  | { type: "eligible"; args: claimArgs }
  | { type: "ineligible" }
  | { type: "claiming" }
  | { type: "error"; error: Error };

// Reducer for claim states:
function claimReducer(state: ClaimState, action: ClaimAction) {
  switch (action.type) {
    case "reset":
      return initialClaimState;
    case "claim":
      return { ...state, isLoading: false };
    case "claiming":
      return { ...state, isClaiming: true };
    case "claimed":
      return { ...state, isClaimed: true, isClaiming: false, isLoading: false };
    case "eligible":
      return { ...state, isEligible: true, args: action.args };
    case "ineligible":
      return { ...state, isEligible: false, isLoading: false };
    case "error":
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
  claim: () => Promise<void>;
} {
  // Claim reducer:
  const [state, dispatch] = useReducer(claimReducer, initialClaimState);
  // Wagmi account hook:
  const { address, isConnected } = useAccount();

  const { config, refetch } = usePrepareContractWrite({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: claimABI,
    functionName: "claim",
    args: state.args,
    enabled: false,
  });

  const { writeAsync } = useContractWrite(config);

  const claim = useCallback(async (): Promise<void> => {
    if (writeAsync) {
      dispatch({ type: "claiming" });

      writeAsync()
        .then((tx) => tx.wait())
        .then(() => {
          dispatch({ type: "claimed" });
        })
        .catch((err) => {
          dispatch({ type: "error", error: err });
          console.error(err);
        });
    }
  }, [writeAsync]);

  useEffect(() => {
    async function checkClaimData() {
      if (state.args) {
        refetch({ throwOnError: true })
          .then(() => {
            dispatch({ type: "claim" });
          })
          .catch((e) => {
            if (e.reason && e.reason.includes("AlreadyClaimed")) {
              dispatch({ type: "claimed" });
            } else {
              dispatch({ type: "error", error: e });
            }
          });
      }
    }
    checkClaimData();
  }, [state.args, refetch]);

  // Check claim data on mount and when account changes:
  useEffect(() => {
    async function checkClaimData() {
      if (isConnected && address) {
        dispatch({ type: "reset" });
        const claimData = await getClaimData(address);

        if (claimData.leaf) {
          dispatch({
            type: "eligible",
            args: [
              BigNumber.from(claimData.leaf.index),
              address,
              BigNumber.from(claimData.leaf.amount),
              claimData.leaf.proof,
            ],
          });
        } else {
          dispatch({ type: "ineligible" });
        }
      }
    }
    checkClaimData();
  }, [isConnected, address]);
  return { ...state, claim };
}
