import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  console.log('get lesson bookmark for', userId)

  const client = await serverSupabaseClient(event)
  const { data: bookmarks } = await client
    .from('user_learning_bookmarks')
    .select()
    .eq('id', userId)

  if (bookmarks && bookmarks.length > 0) {
    return bookmarks[0] // expect only one
  } else {
    return null // quietly return when none found - perfectly valid to discover there are none
  }
})
