import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { genKey } from '~/utils'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  type Entry = {
    thread_id: number
    author_id: number
    responding_to: number
    statement: string
  }
  if (!user) {
    throw new Error('not logged in')
  }
  const key = genKey()
  const entryValues: Entry = {
    thread_id: body.threadId,
    author_id: body.participantId,
    responding_to: body.respondingToId,
    statement: body.statement,
  }
  console.log('starting thread', threadValues)
  const { data, error } = await client
    .from('wsy_threads')
    .insert(threadValues)
    .select()

  if (error) {
    console.log(error.message)
    throw error
  }
  return data[0]
})
