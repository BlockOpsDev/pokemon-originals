import "../styles/globals.css";
import type { AppProps } from "next/app";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { ConnectKitProvider } from "connectkit";

const { chains, provider, webSocketProvider } = configureChains(
  [localhost],
  [publicProvider()]
);

const client = createClient({
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      options: {
        qrcode: false,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
