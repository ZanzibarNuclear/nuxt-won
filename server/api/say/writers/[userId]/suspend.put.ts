import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  console.log('suspend writer => ID: %s', userId)

  const input = {
    suspended_at: new Date(),
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_writers')
    .update(input)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update writer`,
    })
  }
  return toCamelCase(data)
})
