import { format } from 'date-fns'

export const displayAsDate = (ts: string) => {
  if (ts === '') {
    return ''
  }
  return format(new Date(ts), 'd MMMM yyyy')
}

export const displayAsDateTime = (ts: string) => {
  if (ts === '') {
    return ''
  }
  return format(new Date(ts), "d MMMM yyyy 'at' hh:mm b")
}
