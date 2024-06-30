import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('create entry => input: %s', body)

  const client = await serverSupabaseClient(event)
  console.warn('implement me')

  return {
    message: 'noop',
    ...body,
  }
})
