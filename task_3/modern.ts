/* !!! Решение не подходит, так как массив 2 нельзя очищать от повторяющихся  */
const getUniqElements = (arr: number[]) => {
  const hashmap = new Map()
  for (const item of arr) {
    hashmap.set(item, (hashmap.get(item) || 0) + 1)
  }

  const uniq = new Set()
  for (const [num, count] of hashmap) {
    if (count === 1) uniq.add(num)
  }

  return uniq
}

export const modern = (arr1: number[], arr2: number[]) => {
  const uniq1Set = getUniqElements(arr1)
  const uniq2Set = getUniqElements(arr2)
  return Array.from(uniq1Set.intersection(uniq2Set))
}
