import styled from '@emotion/styled'

import { ChartRenderer } from './ChartRenderer'

import type { DashboardConfig, ChartConfig } from './types'

interface DashboardProps {
  config: DashboardConfig
}

export const Dashboard = ({ config }: DashboardProps) => {
  return (
    <div>
      <DashboardWrapper style={{ position: 'absolute', zIndex: 1 }}>
        {config.map((chart, i) => (
          <Chart key={i} chart={chart} />
        ))}
      </DashboardWrapper>
      <DashboardWrapper style={{ position: 'absolute' }}>
        {Array.from({ length: 12 * 12 }).map((_, index) => {
          return <Tile key={index} />
        })}
      </DashboardWrapper>
    </div>
  )
}

const DashboardWrapper = styled.div`
  /* https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j */
  @property --full-height {
    syntax: '<length>';
    initial-value: 0px;
    inherits: false;
  }

  /* Без типизации не распозновался как значение размености в atan2  */
  @property --grid-row-height {
    syntax: '<length>';
    initial-value: 0px;
    inherits: false;
  }

  --full-height: 100dvh;
  --full-width: 100dvw;
  --columns: 12;
  --gap: 10px;

  --gap-total-size: calc((var(--columns) - 1) * var(--gap));
  --full-width-without-gap: calc(var(--full-width) - var(--gap-total-size));
  --grid-row-height: calc(var(--full-width-without-gap) / var(--columns));
  --grid-row-count: tan(
    atan2(var(--full-height), var(--grid-row-height))
  ); /** разрешает делить length типы */

  width: var(--full-width);
  height: var(--full-height);
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-row-count), var(--grid-row-height));
  gap: var(--gap);
`

interface ChartProps {
  chart: ChartConfig
}

const Chart = ({ chart }: ChartProps) => {
  return (
    <ChartCard width={chart.width} height={chart.height}>
      <h4 style={{ margin: 0 }}>{chart.title}</h4>
      <ChartRenderer chart={chart} />
    </ChartCard>
  )
}

const ChartCard = styled.div<{
  width: number
  height: number
}>`
  grid-column: span ${({ width }) => width};
  grid-row: span ${({ height }) => height};
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
`

const Tile = styled.div`
  grid-row: span 1;
  grid-column: span 1;
  background-color: lightgray;
`
