import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  const body = await readBody(event)
  console.log('saving lesson plan details', lessonKey, body)

  // TODO: someday might want to harden API
  if (body.lesson_key !== lessonKey) {
    console.warn(
      'lesson key in payload does not match key in endpoint',
      body,
      lessonKey
    )
  }

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_plans')
    .update(body)
    .eq('public_key', lessonKey)
    .select()

  console.log('result of update', data)

  return data
})
