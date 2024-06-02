import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from('lesson_content_parts')
    .delete()
    .eq('public_key', key)
  if (error) {
    return createError({ status: 500, statusText: 'Something went wrong' })
  }
  return { status: 200, statusText: 'deleted' }
})
