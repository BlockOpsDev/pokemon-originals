import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Connect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <button
      className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
      onClick={() => (isConnected ? disconnect() : connect())}
    >
      {isConnected && address
        ? `${address.slice(0, 4)}...${address.slice(-4)}`
        : "Connect"}
    </button>
  );
}
