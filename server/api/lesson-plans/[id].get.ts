import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('lesson-plans GET id')
  console.log(event.context.params)
  const id = getRouterParam(event, 'id')
  console.log('ID is', id)

  const client = await serverSupabaseClient(event)

  const { data: lesson_plans } = await client
    .from('lesson_plans')
    .select()
    .eq('id', parseInt(id))
  if (lesson_plans && lesson_plans.length > 0) {
    console.log('found', lesson_plans)
    return lesson_plans[0]
  } else {
    console.log('not found')
    return null
    // throw createError({ status: 404, statusText: 'Not found' })
  }
})
