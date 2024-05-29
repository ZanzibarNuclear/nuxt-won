import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  const body = await readBody(event)
  console.log('saving lesson plan details', lessonKey, body)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_plans')
    .update(body)
    .eq('public_key', lessonKey)
    .select()

  return data
})
