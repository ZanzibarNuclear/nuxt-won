import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const publicKey = getRouterParam(event, 'publicKey')
  console.log('retract posted entry => key: %s', publicKey)
  if (!publicKey) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }

  const input = {
    posted_at: null,
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
      statusMessage: `Failed to retract entry`,
    })
  }
  return toCamelCase(data)
})
