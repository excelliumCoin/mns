'use client'

import Image from 'next/image'
import ConnectButton from '../components/ConnectButton'
import BuyScratchCardButton from '../components/BuyScratchCardButton'
import Confetti from '../components/Confetti'
import PoolBalance from '../components/PoolBalance'
import ClaimPrizeButton from '../components/ClaimPrizeButton'
import { useState } from 'react'
import WithdrawPoolButton from '../components/WithdrawPoolButton'

const prizePool = [
  { value: 0.01, chance: 90 },
  { value: 0.1, chance: 70 },
  { value: 1, chance: 40 },
  { value: 2, chance: 35 },
  { value: 5, chance: 10 },
  { value: 10, chance: 2 },
  { value: 20, chance: 0.1 },
  { value: 1000, chance: 0.000001 },
]

function getRandomPrize(): number {
  const total = prizePool.reduce((sum, p) => sum + p.chance, 0)
  const rand = Math.random() * total
  let cumulative = 0
  for (const prize of prizePool) {
    cumulative += prize.chance
    if (rand <= cumulative) return prize.value
  }
  return 0.01
}

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [numbers, setNumbers] = useState<number[] | null>(null)
  const [scratched, setScratched] = useState(false)
  const [winAmount, setWinAmount] = useState<number | null>(null)

  const handleBuySuccess = () => {
    const nums = Array.from({ length: 6 }, () => getRandomPrize())
    setNumbers(nums)
    setScratched(false)
    setWinAmount(null)
  }

  const handleScratch = () => {
    setScratched(true)
    if (!numbers) return

    const matchCount: Record<number, number> = {}
    numbers.forEach((n) => {
      matchCount[n] = (matchCount[n] || 0) + 1
    })

    const winner = Object.entries(matchCount).find(([_, count]) => count >= 3)
    if (winner) {
      const amount = parseFloat(winner[0])
      setWinAmount(amount)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
      alert(`🎉 You WIN ${amount} MONAD!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-700 to-purple-900 text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold tracking-wide">Monad ScratchCard Game 🎯</h1>
            <h2 className="text-4xl font-bold tracking-wide">🎉 Each card is 1 Mon and you can earn up to 1000 Mon with this card 🎉</h2>

      <ConnectButton />
      <PoolBalance />
      <WithdrawPoolButton />
      <BuyScratchCardButton onSuccess={handleBuySuccess} />

      {numbers && !scratched && (
        <button
          onClick={handleScratch}
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-300 transition"
        >
          Scratch
        </button>
      )}

      {scratched && numbers && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 mt-6 animate-fade-in scale-100 transition-all duration-500">
          <h2 className="text-center text-3xl font-bold text-purple-800 mb-4">
            🎯 Kazı Kazan Sonuçları
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {numbers.map((num, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-yellow-100 to-white border-4 border-yellow-400 rounded-xl text-center text-xl font-bold text-purple-900 py-6 shadow-md transform transition hover:scale-110 hover:shadow-yellow-500/60 animate-pop"
              >
                {num} MON
              </div>
            ))}
          </div>
        </div>
      )}

      {winAmount && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="text-green-300 text-xl font-bold">
            🎁 Congratulations! {winAmount} You Win MON!
          </div>
          <ClaimPrizeButton amount={winAmount} />
        </div>
      )}

      {showConfetti && <Confetti />}
    </main>
  )
}
