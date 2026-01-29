import { AGENT_CHARTS } from '../config/charts.js'
import { buildAgentTimeSeriesPipeline } from '../aggregations/agentCharts.aggregation.js'
import { fillTimeSeriesGaps } from '../utils/fillTimeSeriesGaps.js'

import { agentDataCollection } from '../db/collections.js'

export async function queryAgentCharts({ agentName, interval, startDate, endDate }) {
  const pipeline = buildAgentTimeSeriesPipeline({
    agentName,
    charts: AGENT_CHARTS,
    interval,
    startDate,
    endDate,
  })

  const rawSeries = await agentDataCollection().aggregate(pipeline).toArray()

  // Fill gaps once for all metrics
  const filledSeries = fillTimeSeriesGaps(rawSeries, interval, startDate, endDate)

  // Split series per chart
  const chartsData = AGENT_CHARTS.map(chart => ({
    name: chart.name,
    // series: rawSeries.map(row => ({
    series: filledSeries.map(row => ({
      date: row.date,
      value: row[chart.name] || 0,
    })),
  }))

  return chartsData
}
// getAgentCharts({
//   interval,
//   startDate,
//   endDate,
// })

// getAgentChart({
//   agentId,
//   interval,
//   startDate,
//   endDate,
// })

// getCompanyCharts(...)
// getCompanyChart(...)
