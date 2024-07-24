import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('do something about a thread: ' + event.method)
  const public_key = getRouterParam(event, 'public_key')
  console.log('using public_key ' + public_key)
  const client = await serverSupabaseClient(event)
  const { data } = await client
    .from('wsy_threads')
    .select('*')
    .eq('public_key', public_key)

  return data[0]
})
