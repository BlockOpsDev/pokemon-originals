import React from "react";
import Button from "../primaryButton";

interface ClaimButtonProps {
  claim: () => void;
  retry: () => void;
  state: {
    status: string;
    isLoading: boolean;
    isClaiming: boolean;
    isEligible: boolean;
    isClaimed: boolean;
    isError: boolean;
  };
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ claim, retry, state }) => {
  // render claim button
  return (
    <Button
      message={state.status}
      onClick={state.isError ? retry : claim}
      isLoading={state.isLoading || state.isClaiming}
      isEnabled={!state.isClaimed && state.isEligible}
    />
  );
};

export default ClaimButton;
