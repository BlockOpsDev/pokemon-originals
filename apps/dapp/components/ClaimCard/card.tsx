///react card component styled with tailwind css
///contains claim button component
import useClaim from "hooks/useClaim";
import React from "react";
import ClaimButton from "./button";

interface ClaimCardProps {
  address: `0x${string}`;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ address }) => {
  const { claim, ...claimState } = useClaim();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <ClaimButton claim={claim} state={claimState} />
    </div>
  );
};

export default ClaimCard;
