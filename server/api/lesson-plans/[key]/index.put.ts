import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  const body = await readBody(event)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_plans')
    .update(body)
    .eq('public_key', lessonKey)
    .select()

  console.log('result of update', data)

  return data
})
