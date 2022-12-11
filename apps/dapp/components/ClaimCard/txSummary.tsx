import React from "react";
import { BigNumber, utils } from "ethers";
import Info from "@components/info";
import { ClaimData } from "hooks/useClaim";

interface TxSummaryProps {
  state: {
    status: string;
    claimData?: ClaimData;
    isLoading: boolean;
    isEligible: boolean;
    isSuccess: boolean;
    tx?: string;
  };
}

const TxSummary: React.FC<TxSummaryProps> = ({ state }) => {
  if (state.isLoading)
    return (
      <Info title="What does this mean?">
        <p>
          Holders of Logan’s Pokemon NFTs are entitled to ETH Royalty Rewards
          from the 99 Originals’ auctions.
        </p>
        <br />
        <p>
          On Dec X, 2022, a snapshot was taken of all eligible holders. Connect
          your wallet and click the button below to see if you qualify for
          rewards.
        </p>
      </Info>
    );

  if (!state.isEligible)
    return (
      <Info title="You're Ineligible">
        <div>
          <p>
            It appears the wallet you have connected is not eligible for any
            Royalty Rewards.
          </p>
          <br />
          <p>
            1. Double check the wallet you connected is on the Polygon (Matic)
            network and has the Pokemon NFTs in it.
          </p>
          <p>
            2. Make sure the LP Pokemon NFTs you possess are authentic and match
            the following Polygon Contract address:
          </p>
          <p className="font-bold">
            0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757
          </p>
        </div>
      </Info>
    );

  return (
    <Info title={state.status}>
      {state.claimData && (
        <>
          {Object.keys(state.claimData.nfts).map((nft) => {
            return (
              <div key={nft} className="flex items-center px-3">
                <p className="text-center">
                  {`${state.claimData!.nfts[nft].quantity}x ${nft} = ${
                    state.claimData!.nfts[nft].reward
                  }
                `}
                  <span className="font-semibold">ETH</span>
                </p>
              </div>
            );
          })}
          <span className="font-semibold">
            Total Reward:{" "}
            {utils
              .formatEther(BigNumber.from(state.claimData?.leaf.amount))
              .toString()}{" "}
            ETH
          </span>
          <br />
        </>
      )}
      {state.isSuccess && (
        <span className="font-semibold">
          Success!{" "}
          <a href={`https://polygonscan.com/tx/${state.tx}`}>
            View Transaction
          </a>
        </span>
      )}
    </Info>
  );
};

export default TxSummary;
