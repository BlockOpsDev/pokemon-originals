import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ConnectKitProvider } from "connectkit";
import "../styles/globals.css";

const { chains, provider } = configureChains(
  [chain.localhost, chain.polygonMumbai, chain.polygon],
  [
    jsonRpcProvider({
      rpc: (_) => ({
        http: `http://127.0.0.1:8545/`,
      }),
    }),
  ]
);

const client = createClient({
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: false,
      },
    }),
  ],
  provider,
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
