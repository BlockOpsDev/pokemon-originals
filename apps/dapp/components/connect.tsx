import React from "react";
import { ConnectKitButton, useModal } from "connectkit";
import Button from "./primaryButton";

interface Props {
  connectMessage?: string;
}

const Connect: React.FC<Props> = ({ connectMessage }) => {
  const { open } = useModal();

  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        isConnecting,
        show,
        address,
        ensName,
        truncatedAddress,
      }) => {
        return (
          <Button
            message={
              isConnected && address
                ? ensName ?? truncatedAddress!
                : connectMessage ?? "Connect"
            }
            isLoading={(!isConnected || !address) && (isConnecting || open)}
            isEnabled={true}
            onClick={show}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default Connect;
