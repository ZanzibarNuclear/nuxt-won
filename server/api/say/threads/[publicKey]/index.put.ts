import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'public_key')
  const body = await readBody(event)
  console.log('update thread => key: %s; input: %s', key, body)

  const client = await serverSupabaseClient(event)
  console.warn('implement me')

  return {
    message: 'noop',
    key,
    ...body,
  }
})
