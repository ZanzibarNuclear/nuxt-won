import { serverSupabaseClient } from '#supabase/server'

/* TODO: someday will want to narrow the select to writers on the given thread instead 
    of retrieving all participants. Supabase is limiting this ability. */
export default defineEventHandler(async (event) => {
  const threadId = getRouterParam(event, 'thread_id')
  console.log(
    'return list of writers on thread ' +
      threadId +
      ' (really all participants in WSY)'
  )
  const client = await serverSupabaseClient(event)

  const { data } = await client.from('wsy_participants').select('id, alias')

  return data
})
