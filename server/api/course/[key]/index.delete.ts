import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseKey = getRouterParam(event, 'key')
  console.log('courses DELETE by key', courseKey)

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from('courses')
    .delete()
    .eq('public_key', courseKey)

  if (error) {
    console.error('Something went wrong', error.message)
    return createError({ status: 500, statusText: 'Something went wrong' })
  }
})
