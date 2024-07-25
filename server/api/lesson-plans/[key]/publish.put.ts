import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  console.log('publish lesson', lessonKey)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_plans')
    .update({ published_at: new Date() })
    .eq('public_key', lessonKey as string)
    .select()
  if (error) {
    console.error(error)
  }
  return data[0]
})
