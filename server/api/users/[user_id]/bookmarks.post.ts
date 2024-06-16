import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  // drop any unexpected stuff
  const input = {
    ...body,
    updated_at: new Date().toISOString(),
  }

  console.log('update bookmark', body)
  const { data, error } = await client
    .from('user_learning_bookmarks')
    .upsert(input)
    .select()
  if (error) {
    return createError({
      status: 500,
      statusText: error.message,
    })
  }
  return data[0]
})
