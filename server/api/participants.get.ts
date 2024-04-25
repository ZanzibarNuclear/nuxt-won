import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  if (!user) {
    // TODO: enforce authentication in middleware on protected routes
    throw createError({
      statusCode: 401,
      statusMessage: `who are you? Please sign in`,
    })
  }
  const { data } = await client
    .from('wsy_participants')
    .select('*')
    .eq('user_id', user.id)

  if (!data) {
    return null
  }
  console.log(data[0])
  return { participants: data[0] }
})
