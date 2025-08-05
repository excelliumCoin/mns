'use client'

import Image from 'next/image'
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

export default function ConnectButton() {
  const { connect } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className="flex flex-col items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium bg-white/10 px-4 py-2 rounded-full">
            Connected: {shortAddress}
          </span>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            Logout!
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: metaMask() })}
          className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-bold transition"
        >
          <Image
            src="/images/metamask.svg"
            alt="MetaMask"
            width={24}
            height={24}
          />
          Connect With Metamask
        </button>
      )}
    </div>
  )
}
