import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  console.log('unpublish lesson', lessonKey)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_plans')
    .update({ published_at: null })
    .eq('public_key', lessonKey as string)
    .select()
  if (error) {
    console.error(error)
  }
  return data[0]
})
