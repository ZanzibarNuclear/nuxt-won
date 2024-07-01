import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const publicKey = getRouterParam(event, 'publicKey')
  console.log('archive entry => key: %s', publicKey)
  if (!publicKey) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }

  const input = {
    archived_at: new Date(),
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
      statusMessage: `Failed to archive thread`,
    })
  }
  return toCamelCase(data)
})
