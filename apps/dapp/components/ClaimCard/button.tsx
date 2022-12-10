import React from "react";
import Button from "../primaryButton";
import useClaim from "../../hooks/useClaim";

interface ClaimButtonProps {
  claim: () => void;
  state: {
    isLoading: boolean;
    isClaiming: boolean;
    isEligible: boolean;
    isClaimed: boolean;
  };
}

// Claim component:
const ClaimButton: React.FC<ClaimButtonProps> = ({ claim, state }) => {
  // Claim hook:
  // render claim button
  return (
    <Button
      message={
        state.isEligible
          ? state.isClaimed
            ? "Claimed"
            : "Claim"
          : "Ineligible"
      }
      onClick={claim}
      isLoading={state.isLoading || state.isClaiming}
      isEnabled={!state.isClaimed && state.isEligible}
    />
  );
};

export default ClaimButton;
