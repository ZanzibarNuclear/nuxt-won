import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data } = await client.from('wsy_threads').select('*')

  if (!data) {
    return null
  }
  console.log(data)
  return { threads: data }
})
