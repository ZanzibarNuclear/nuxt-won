import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const publicKey = getRouterParam(event, 'publicKey')
  console.log('release entry on hold => key: %s', publicKey)
  if (!publicKey) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields`,
    })
  }

  const input = {
    held_for_review_at: null,
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
      statusMessage: `Failed to release entry on hold`,
    })
  }
  return toCamelCase(data)
})
