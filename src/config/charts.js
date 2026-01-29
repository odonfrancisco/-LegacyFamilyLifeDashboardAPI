const BASE_CHARTS = [
  {
    name: 'Contacts',
    metricPath: 'data.contacts.total',
    aggregation: 'sum',
  },
  {
    name: 'Presentations',
    metricPath: 'data.presentations.total',
    aggregation: 'sum',
  },
  {
    name: 'Sales',
    metricPath: 'data.sales.total',
    aggregation: 'sum',
  },
  {
    name: 'Premium',
    metricPath: 'data.sales.premium',
    aggregation: 'sum',
  },
  {
    name: 'Dials',
    metricPath: 'data.dials.total',
    aggregation: 'sum',
  },
  {
    name: 'Manual Dials',
    metricPath: 'data.dials.manual',
    aggregation: 'sum',
  },
  {
    name: 'Inbound Dials',
    metricPath: 'data.dials.inbound',
    aggregation: 'sum',
  },
]

export const AGENT_CHARTS = [...BASE_CHARTS]
export const COMPANY_CHARTS = [
  ...BASE_CHARTS,
  { name: 'Active Agents', metricPath: 'data.agents.total', aggregation: 'sum' },
]
