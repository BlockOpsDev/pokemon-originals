import React from "react";
import { ConnectKitButton, useModal } from "connectkit";
import Button from "./button";

interface Props {
  connectMessage?: string;
}

const Connect: React.FC<Props> = ({ connectMessage }) => {
  const { open } = useModal();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address }) => {
        return (
          <Button
            message={
              isConnected && address
                ? "Disconnect Wallet"
                : connectMessage ?? "Connect Wallet"
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
