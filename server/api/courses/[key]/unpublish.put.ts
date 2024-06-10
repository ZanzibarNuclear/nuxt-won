import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseKey = getRouterParam(event, 'key')
  console.log('unpublish course', courseKey)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('courses')
    .update({ published_at: null })
    .eq('public_key', courseKey as string)
    .select()
  if (error) {
    console.error(error)
  }
  return data[0]
})
