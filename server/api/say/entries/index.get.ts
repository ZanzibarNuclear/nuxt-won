import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('get entries')
  const client = await serverSupabaseClient(event)
  console.warn('implement me')

  return []
})
