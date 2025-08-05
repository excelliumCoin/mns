'use client'

import { useWriteContract } from 'wagmi'
import { abi } from '../abi/ScratchCard'
import { SCRATCHCARD_ADDRESS } from '../lib/contract'
import { parseEther } from 'viem'
import { useState } from 'react'

export default function ClaimPrizeButton({ amount }: { amount: number }) {
  const { writeContractAsync } = useWriteContract()
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const handleClaim = async () => {
    if (claimed || isClaiming) return

    try {
      setIsClaiming(true)

      await writeContractAsync({
        address: SCRATCHCARD_ADDRESS,
        abi,
        functionName: 'claimPrize',
        args: [parseEther(amount.toString())],
      })

      alert(`🎉 ${amount} MONAD has been transferred to your wallet account!`)
      setClaimed(true)
    } catch (error) {
      console.error(error)
      alert('An error occurred while claiming the reward..')
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <button
      onClick={handleClaim}
      disabled={claimed || isClaiming}
      className={`font-bold px-4 py-2 rounded transition ${
        claimed
          ? 'bg-gray-500 text-white cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-400 text-white'
      }`}
    >
      {claimed ? '🎉 Reward Claimed' : isClaiming ? 'Claiming...' : `💰  Claim ${amount} MONAD`}
    </button>
  )
}
