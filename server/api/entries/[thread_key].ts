import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('get entries for a thread: ' + event.method)
  const thread_key = getRouterParam(event, 'thread_key')
  console.log('using thread.public_key ' + thread_key)

  const client = await serverSupabaseClient(event)
  const { data } = await client
    .from('wsy_entries')
    .select('*, wsy_threads!inner(id, public_key)')
    .eq('wsy_threads.public_key', thread_key)

  console.log(data)
  return data
})
