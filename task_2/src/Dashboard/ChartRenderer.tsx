import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { ChartConfig } from './types'

interface ChartRendererProps {
  chart: ChartConfig
}

export const ChartRenderer = ({ chart }: ChartRendererProps) => {
  if (!chart.data?.metrics || chart.data.metrics.length === 0) {
    return <div>Нет данных для отображения</div>
  }

  const data = chart.data.metrics.map((d, index) => ({ index, ...d }))
  const metricKeys = Object.keys(data[0]).filter(key => key !== 'index')

  if (chart.type === 'linear') {
    return <LinearChart data={data} metricKeys={metricKeys} colorScheme={chart.colorScheme} />
  } else if (chart.type === 'area') {
    return <AreaCustomChart data={data} metricKeys={metricKeys} colorScheme={chart.colorScheme} />
  } else if (chart.type === 'bar') {
    return <BarCustomChart data={data} metricKeys={metricKeys} colorScheme={chart.colorScheme} />
  }

  return null
}

interface ChartProps {
  data: {
    index: number
  }[]
  metricKeys: string[]
  colorScheme: string[]
}

const LinearChart = ({ data, metricKeys, colorScheme }: ChartProps) => {
  return (
    <ResponsiveContainer height="95%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        {metricKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colorScheme[i % colorScheme.length]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

const AreaCustomChart = ({ data, metricKeys, colorScheme }: ChartProps) => {
  return (
    <ResponsiveContainer height="95%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        {metricKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colorScheme[i % colorScheme.length]}
            fill={colorScheme[i % colorScheme.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

const BarCustomChart = ({ data, metricKeys, colorScheme }: ChartProps) => {
  return (
    <ResponsiveContainer height="95%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Legend />
        {metricKeys.map((key, i) => (
          <Bar key={key} dataKey={key} fill={colorScheme[i % colorScheme.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
