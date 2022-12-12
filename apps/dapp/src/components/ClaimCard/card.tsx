import React, { useEffect } from "react";
import { useAccount } from "wagmi";

import useClaim from "../../hooks/useClaim";

import Connect from "../connect";
import ClaimButton from "./button";
import TxSummary from "./txSummary";

const ClaimCard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { claim, retry, ...claimState } = useClaim();

  useEffect(() => {
    if (claimState.isError) {
      console.log("Error time");
      console.log(claimState.error);
    }
  }, [claimState.error, claimState.isError]);

  return (
    <div className="h-full w-full">
      <div className="font-poppins mb-4 text-3xl font-extrabold text-black">
        Reward Distributions
      </div>
      <TxSummary state={claimState} />
      <div className="mb-4 flex h-12 justify-center text-2xl">
        {isConnected && address ? (
          <ClaimButton claim={claim} retry={retry} state={claimState} />
        ) : (
          <Connect connectMessage="Check Eligibility" />
        )}
      </div>
      <div className="border-card-bg rounded-xl border p-3 text-black">
        <div className="font-poppins mb-2 font-bold">Disclaimer</div>
        <div className="font-roboto">
          <p>
            Eligible holders have until January X, 2023, to claim any
            outstanding rewards from this royalty distribution event. Failure to
            claim rewards before the aforementioned date will result in the
            forfeiture of your rewards.
          </p>
          <br />
          <p>
            If you have any questions or concerns, please open a support ticket
            in the OriginalsDAO Discord server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;
