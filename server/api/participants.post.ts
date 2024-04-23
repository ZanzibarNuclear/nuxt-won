import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  if (!user) {
    throw new Error('not logged in')
  }
  console.log(user.id + ' wants to register for WSY', body)
  const blargy = {
    alias: body.alias,
    user_id: user.id,
  }
  const { data, error } = await client
    .from('wsy_participants')
    .insert(blargy)
    .select()

  if (error) {
    console.log(error.message)
    throw error
  }
  return data
})
