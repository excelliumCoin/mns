// wagmi.config.ts
import { createConfig, http } from 'wagmi'
import { metaMask } from '@wagmi/connectors'
import { defineChain } from 'viem'

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'MONAD',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
})

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [metaMask()],
  transports: {
    [monadTestnet.id]: http(),
  },
  ssr: true,
})
