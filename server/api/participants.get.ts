import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  if (!user) {
    throw new Error('not logged in')
  }
  const { data } = await client
    .from('wsy_participants')
    .select('*')
    .eq('user_id', user.id)

  return { participants: data }
})
