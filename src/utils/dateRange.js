export function computeDateRange(range) {
  //   const now = new Date()
  //   const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const endDate = new Date()

  const days = parseInt(range.replace('d', ''), 10)

  const startDate = new Date(endDate)
  startDate.setUTCDate(startDate.getUTCDate() - (days - 1))

  return {
    startDate,
    endDate,
  }
}
