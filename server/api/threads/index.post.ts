import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { genKey } from '~/utils'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  type Thread = {
    owner_id: number
    public_key: string
    topic: string
  }
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: `who are you? Please sign in`,
    })
  }
  const key = genKey()
  const threadValues: Thread = {
    public_key: key,
    owner_id: body.owner_id,
    topic: body.topic,
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
