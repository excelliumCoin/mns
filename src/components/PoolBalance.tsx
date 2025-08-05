'use client'

import { useEffect, useState } from 'react'
import { SCRATCHCARD_ADDRESS } from '../lib/contract'
import { usePublicClient } from 'wagmi'
import { formatEther } from 'viem'

export default function PoolBalance() {
  const [balance, setBalance] = useState<string | null>(null)
  const client = usePublicClient()

useEffect(() => {
  const fetchBalance = async () => {
    if (!client) return  // <-- null kontrolü burada
    try {
      const value = await client.getBalance({
        address: SCRATCHCARD_ADDRESS,
      })
      setBalance(formatEther(value))
    } catch (err) {
      console.error('Balance fetch error:', err)
      setBalance(null)
    }
  }

  fetchBalance()
  const interval = setInterval(fetchBalance, 10000)
  return () => clearInterval(interval)
}, [client])

  return (
    <div className="bg-white text-purple-900 font-semibold px-4 py-2 rounded shadow text-center text-sm">
      🎯 Havuz Bakiyesi: {balance !== null ? `${balance} MONAD` : 'Yükleniyor...'}
    </div>
  )
}
