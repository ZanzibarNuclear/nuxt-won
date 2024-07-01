import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  console.log('get writers')
  const client = await serverSupabaseClient(event)
  const { data, error } = await client.from('say_writers').select('*')
  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve writers`,
    })
  }
  return data?.map((row) => toCamelCase(row))
})
