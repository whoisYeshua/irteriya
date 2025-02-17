import type { DashboardConfig } from './types'

export const dashboardConfig: DashboardConfig = [
  {
    title: 'Производительность CPU',
    type: 'linear',
    colorScheme: ['#FF5733', '#33FF57', '#3357FF'],
    width: 3,
    height: 2,
    data: {
      time: new Date(),
      metrics: [
        { Intel: 78, AMD: 23 },
        { Intel: 63, AMD: 45 },
      ],
    },
  },
  {
    title: 'Использование памяти',
    type: 'area',
    colorScheme: ['#FFAA00', '#00AABB'],
    width: 3,
    height: 2,
    data: {
      time: new Date(),
      metrics: [{ L4: 65 }, { L4: 70 }],
    },
  },
  {
    title: 'Динамика дисковой активности',
    type: 'bar',
    colorScheme: ['#AA33FF', '#33AAFF'],
    width: 9,
    height: 2,
    data: {
      time: new Date(),
      metrics: [
        { HDD: 55, SSD: 43 },
        { HDD: 60, SSD: 70 },
      ],
    },
  },
]
