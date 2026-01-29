import { startOfWeek, startOfMonth } from 'date-fns'

export function alignStartDate(startDate, interval) {
  switch (interval) {
    case 'week':
      // startOfWeek defaults to Sunday; specify Monday
      return startOfWeek(startDate, { weekStartsOn: 1 })
    case 'month':
      return startOfMonth(startDate)
    case 'day':
    default:
      return startDate
  }
}
