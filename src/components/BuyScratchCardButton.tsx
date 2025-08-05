'use client'

import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { abi } from '../abi/ScratchCard'
import { SCRATCHCARD_ADDRESS } from '../lib/contract'

export default function BuyScratchCardButton({ onSuccess }: { onSuccess: () => void }) {
  const [isBuying, setIsBuying] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const handleBuy = async () => {
    try {
      setIsBuying(true)
      await writeContractAsync({
        address: SCRATCHCARD_ADDRESS,
        abi,
        functionName: 'buyTicket',
        value: parseEther('1'),
      })
      onSuccess()
      alert('Scratch card successfully purchased!')
    } catch (error) {
      console.error(error)
      alert('An error occurred while purchasing the card.')
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={isBuying}
      className="bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-300 transition"
    >
      {isBuying ? 'Purchasing...' : 'Buy Scratch Card (1 MONAD)'}
    </button>
  )
}
