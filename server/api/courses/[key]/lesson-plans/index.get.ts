import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseKey = getRouterParam(event, 'key')
  console.log('loading lessons for course', courseKey)

  const client = await serverSupabaseClient(event)
  const { data: lessonPlans } = await client
    .from('lesson_plans')
    .select('*, courses!inner (public_key)')
    .eq('courses.public_key', courseKey)

  if (lessonPlans && lessonPlans.length > 0) {
    return lessonPlans
  } else {
    console.log('not found')
    return null
  }
})
