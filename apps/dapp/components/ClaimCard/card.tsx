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
      <TxSummary state={claimState} />

      {isConnected && address ? (
        <ClaimButton claim={claim} retry={retry} state={claimState} />
      ) : (
        <Connect connectMessage="Check Eligibility" />
      )}
    </div>
  );
};

export default ClaimCard;
