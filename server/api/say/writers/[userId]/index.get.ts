import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  console.log('get writer => ID: %s', userId)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_writers')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve writer`,
    })
  }
  return toCamelCase(data)
})
