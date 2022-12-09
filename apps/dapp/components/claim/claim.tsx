import React from "react";
import Button from "../primaryButton";
import useClaim from "../../hooks/useClaim";

// Claim component:
const ClaimCard = () => {
  // Claim hook:
  const { claim, isLoading, isEligible, isClaimed, isClaiming } = useClaim();
  // render claim button
  return (
    <Button
      message={isEligible ? (isClaimed ? "Claimed" : "Claim") : "Ineligible"}
      onClick={claim}
      isLoading={isLoading || isClaiming}
      isEnabled={!isClaimed && isEligible}
    />
  );
};

export default ClaimCard;
