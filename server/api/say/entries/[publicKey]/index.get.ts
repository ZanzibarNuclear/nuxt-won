import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const publicKey = getRouterParam(event, 'publicKey')
  console.log('get entry => ID: %s', publicKey)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('say_entries')
    .select('*')
    .eq('public_key', publicKey)
    .single()

  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve entry`,
    })
  }
  return toCamelCase(data)
})
