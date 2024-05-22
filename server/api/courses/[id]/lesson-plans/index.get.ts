import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const client = await serverSupabaseClient(event)

  const { data: lessonPlans } = await client
    .from('lesson_plans')
    .select()
    .eq('course_id', parseInt(id))

  if (lessonPlans && lessonPlans.length > 0) {
    return lessonPlans
  } else {
    console.log('not found')
    return null
  }
})
