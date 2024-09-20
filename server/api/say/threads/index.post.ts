import { serverSupabaseClient } from '#supabase/server'
import { genKey, toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('create thread => input: %s', body)
  const { ownerId, topic } = body
  if (!ownerId || !topic) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }
  const input = {
    public_key: genKey(),
    owner_id: ownerId,
    topic: topic,
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_threads')
    .insert(input)
    .select()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create thread`,
    })
  }
  return toCamelCase(data[0])
})
