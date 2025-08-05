'use client'

import { useAccount, useWriteContract } from 'wagmi'
import { abi } from '../abi/ScratchCard'
import { SCRATCHCARD_ADDRESS } from '../lib/contract'

export default function WithdrawPoolButton() {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const isOwner = address === '0xF244BE6bBfaCebf1f12A7a18DFd9645b51e8F8bf' // Sözleşme sahibi adresi

  const handleWithdraw = async () => {
    try {
      await writeContractAsync({
        address: SCRATCHCARD_ADDRESS,
        abi,
        functionName: 'withdraw',
      })
      alert('Ödül havuzu başarıyla çekildi.')
    } catch (error) {
      console.error(error)
      alert('Hata oluştu, işlem başarısız.')
    }
  }

  if (!isOwner) return null

  return (
    <button
      onClick={handleWithdraw}
      className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-6"
    >
      Ödül Havuzunu Boşalt (Admin)
    </button>
  )
}
