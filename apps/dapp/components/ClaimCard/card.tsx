///react card component styled with tailwind css
///contains claim button component
import Connect from "@components/connect";
import useClaim from "hooks/useClaim";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
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
    <div className="w-full h-full">
      <div className="text-black text-3xl font-extrabold font-poppins mb-4">
        Reward Distributions
      </div>
      <TxSummary state={claimState} />
      <div className="flex justify-center h-12 text-2xl mb-4">
        {isConnected && address ? (
          <ClaimButton claim={claim} retry={retry} state={claimState} />
        ) : (
          <Connect connectMessage="Check Eligibility" />
        )}
      </div>
      <div className="text-black border rounded-xl border-card-bg p-3">
        <div className="font-bold font-poppins mb-2">Disclaimer</div>
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
