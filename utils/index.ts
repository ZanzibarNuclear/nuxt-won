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

export const genKey = (digits = 10) => {
  return generateRandomString(digits)
}

function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}
