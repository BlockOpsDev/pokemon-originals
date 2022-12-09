import React from "react";
import Button from "../primaryButton";
import useClaim from "../../hooks/useClaim";

// Claim component:
const ClaimCard = () => {
  // Claim hook:
  const { claimTx, isLoading, isEligible, isClaimed } = useClaim();
  // render claim button
  return (
    <Button
      message={isEligible ? (isClaimed ? "Claimed" : "Claim") : "Ineligible"}
      onClick={claimTx}
      isLoading={isLoading}
      isEnabled={!isClaimed}
    />
  );
};

export default ClaimCard;
