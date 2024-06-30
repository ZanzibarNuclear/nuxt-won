import { _columns } from '#tailwind-config/theme'
import { format } from 'date-fns'
import { camelCase, snakeCase } from 'lodash/string'

export const displayAsDate = (ts: string) => {
  if (!ts || ts === '') {
    return ''
  }
  return format(new Date(ts), 'd MMMM yyyy')
}

export const displayAsDateTime = (ts: string) => {
  if (!ts || ts === '') {
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

export const toCamelCase = (row: object) => {
  if (!row) {
    return null
  }
  console.log(row)

  var out = {}
  for (const column in row) {
    console.log(column)
    if (row.hasOwnProperty(column)) {
      const camelCased = camelCase(column)
      out[camelCased] = row[column]
    }
  }
  return out
}

export const toSnakeCase = (obj: object) => {
  if (!obj) {
    return null
  }
  var row = {}
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const snakeCased = snakeCase(prop)
      row[snakeCased] = obj[prop]
    }
  }
  return row
}
