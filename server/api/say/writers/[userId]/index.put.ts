import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  const body = await readBody(event)
  console.log('update writer => ID: %s, deltas: %s', userId, body)
  const { penName } = body
  if (!userId || !penName) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }

  const input = {
    pen_name: penName,
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
