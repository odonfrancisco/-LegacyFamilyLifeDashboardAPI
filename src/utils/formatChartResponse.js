export function formatChartResponse({
  entityType,
  entityId = null,
  interval,
  startDate,
  endDate,
  series,
}) {
  return {
    meta: {
      entityType,
      entityId,
      interval,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
    },
    series,
  }
}
