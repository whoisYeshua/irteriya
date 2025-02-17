/*
n = длина массива arr1
m = длина массива arr2

1: Подсчёт количества вхождений для arr1
Итерируемся по массиву arr1 один раз
Время выполнения O(n)
set & get имеют сложность амортизированую O(1) или O(log n)

2: Подсчёт частот для arr2
Итерируемся по массиву arr2 один раз
Время выполнения O(m)
set & get имеют сложность амортизированую O(1) или O(log m)

Шаг 3: Поиск уникальных элементов и суммирование вхождений
Итерируемся по Map, созданному по массиву arr1. В худшем случае количество уникальных ключей ≤ n.
Время выполнения: O(n)
Для каждого ключа выполняется операция получения значения из Map (map2.get(item)), которая имеет сложность амортизированую O(1) или O(log n).

Общая сложность:
O(n) + O(m) + O(n) → O(n + m)

Сложность по памяти в худшем случае будет также O(n + m)
*/

const getCountedElements = (arr: number[]) => {
  const map = new Map<number, number>()
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1)
  }
  return map
}

export const classic = (arr1: number[], arr2: number[]) => {
  const map1 = getCountedElements(arr1)
  const map2 = getCountedElements(arr2)
  let count = 0
  for (const [item, value] of map1) {
    if (value !== 1) continue
    count += map2.get(item) ?? 0
  }
  return count
}
