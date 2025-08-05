'use client'

import { useState } from 'react'
import BuyScratchCardButton from './BuyScratchCardButton'
import confetti from 'canvas-confetti'

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

export default function ScratchCard() {
  const [numbers, setNumbers] = useState<number[] | null>(null)
  const [scratched, setScratched] = useState(false)
  const [winAmount, setWinAmount] = useState<number | null>(null)

  const generateNumbers = () => {
    const nums = Array.from({ length: 6 }, () => getRandomPrize())
    console.log('Scratch Card Number:', nums)
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
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      alert(`🎉 You WIN ${amount} MONAD`)
    }
  }

  return (
    <div className="bg-purple-900 text-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Monad Scratch Game</h2>

      <BuyScratchCardButton onSuccess={generateNumbers} />

      {numbers && !scratched && (
        <div className="text-center mt-4">
          <button
            onClick={handleScratch}
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition"
          >
            Kartı Kazı
          </button>
        </div>
      )}

      {scratched && numbers && (
        <div className="grid grid-cols-3 gap-4 mt-6 text-purple-900 font-bold text-xl bg-white/90 p-4 rounded">
          {numbers.map((num, i) => (
            <div key={i} className="text-center p-2">
              {num} MON
            </div>
          ))}
        </div>
      )}

      {winAmount && (
        <div className="text-green-400 text-center text-xl font-bold mt-4">
          🎁 Congratulations! You Win {winAmount} MONAD!
        </div>
      )}
    </div>
  )
}
