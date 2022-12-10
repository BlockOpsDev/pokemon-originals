import ClaimCard from "@components/ClaimCard/card";
import Connect from "@components/connect";
import Button from "@components/primaryButton";
import { useModal } from "connectkit";
import useClaim from "hooks/useClaim";
import { useAccount, useConnect } from "wagmi";

export default function Index() {
  const { address, isConnected } = useAccount();
  // const { isLoading } = useConnect();
  // const claimData = useClaim();
  // const { open } = useModal();

  return (
    <>
      <Connect />
      {isConnected && address ? (
        <ClaimCard address={address} />
      ) : (
        <Connect connectMessage="Check Eligibility" />
      )}
    </>
  );
}
