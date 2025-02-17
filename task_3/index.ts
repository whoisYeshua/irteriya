import { Bench } from 'tinybench'

import { classic } from './classic.ts'

const bench = new Bench({ name: 'simple benchmark', time: 10000 })

const getRandomRepetitions = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const generateArrayWithDetails = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => {
    const number = i + 1
    const repetitions = getRandomRepetitions(1, 5)
    return Array(repetitions).fill(number)
  }).flat()
}

const COUNT = 102345
const A = generateArrayWithDetails(COUNT)
const B = generateArrayWithDetails(COUNT)

bench.add('Classic task (target solution)', () => {
  classic(A, B)
})

await bench.run()

console.log(bench.name)
console.table(bench.table())
