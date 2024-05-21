import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('courses GET id')
  console.log(event.context.params)
  const id = getRouterParam(event, 'id')
  console.log('course ID is', id)

  const client = await serverSupabaseClient(event)

  const { data: lessonPlans } = await client
    .from('lesson_plans')
    .select()
    .eq('course_id', parseInt(id))

  if (lessonPlans && lessonPlans.length > 0) {
    console.log('found', lessonPlans)
    return lessonPlans
  } else {
    console.log('not found')
    return null
    // throw createError({ status: 404, statusText: 'Not found' })
  }
})
