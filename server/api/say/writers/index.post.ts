import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('create writer => input: %s', body)
  const { userId, penName } = body
  if (!userId || !penName) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }
  const input = {
    user_id: userId,
    pen_name: penName,
    joined_at: new Date(),
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_writers')
    .insert(input)
    .select()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create writer`,
    })
  }
  return toCamelCase(data[0])
})
