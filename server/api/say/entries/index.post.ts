import { serverSupabaseClient } from '#supabase/server'
import { genKey, toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('create entry => input: %s', body)
  const { threadKey, writerId, inResponseTo, statement } = body
  if (!threadKey || !writerId || !statement) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }
  const input = {
    public_key: genKey(),
    thread_key: threadKey,
    writer_id: writerId,
    in_response_to: inResponseTo,
    statement,
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_entries')
    .insert(input)
    .select()
    .single()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create entry`,
    })
  }
  return toCamelCase(data)
})
