import type { AppProps } from 'next/app'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import '../styles/globals.css'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={client}>
    <Component {...pageProps} />
    </WagmiConfig>
  )
}
