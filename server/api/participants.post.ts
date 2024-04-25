import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: `who are you? Please sign in`,
    })
  }
  console.log(user.id + ' wants to register for WSY', body)
  const setupParams = {
    alias: body.alias,
    user_id: user.id,
  }
  const { data, error } = await client
    .from('wsy_participants')
    .insert(setupParams)
    .select()

  if (error) {
    console.log(error.message)
    throw error
  }
  return data[0]
})
