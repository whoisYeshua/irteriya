/** Типы графиков */
export type ChartType = 'linear' | 'area' | 'bar'

export interface ChartData {
  time: Date
  /** Каждый объект метрики – ключ: название, значение: число */
  metrics: { [metricName: string]: number }[]
}

export interface ChartConfig {
  /** Заголовок */
  title: string
  /** Тип графика */
  type: ChartType
  /**  Массив цветов */
  colorScheme: string[]
  /** Размер графика в сетке (количество колонок) */
  width: number
  /** Размер графика в сетке (количество рядов) */
  height: number
  /** данные для графика */
  data?: ChartData
}

export type DashboardConfig = ChartConfig[]
