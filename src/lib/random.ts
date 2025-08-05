import { prizePool } from './prizes'

export function getWeightedRandom(): number {
  const totalWeight = prizePool.reduce((acc, prize) => acc + prize.weight, 0);
  const random = Math.random() * totalWeight;
  let runningWeight = 0;

  for (const prize of prizePool) {
    runningWeight += prize.weight;
    if (random < runningWeight) return prize.value;
  }

  return 0.01;
}