import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const publicKey = getRouterParam(event, 'publicKey')
  const body = await readBody(event)
  console.log('update entry => key: %s; input: %s', publicKey, body)
  const { statement } = body
  if (!publicKey || !statement) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }

  const input = {
    statement,
    updated_at: new Date(),
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_entries')
    .update(input)
    .eq('public_key', publicKey)
    .select()
    .single()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update thread`,
    })
  }
  return toCamelCase(data)
})
