import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')

  const client = await serverSupabaseClient(event)
  const { data: lesson_plans } = await client
    .from('lesson_plans')
    .select()
    .eq('public_key', lessonKey)

  if (lesson_plans && lesson_plans.length > 0) {
    return lesson_plans[0]
  } else {
    throw createError({ status: 404, statusText: 'Not found' })
  }
})
