import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'public_key')
  console.log('release entry => key: %s', key)

  const client = await serverSupabaseClient(event)
  console.warn('implement me')

  return {
    message: 'noop',
    key,
  }
})
