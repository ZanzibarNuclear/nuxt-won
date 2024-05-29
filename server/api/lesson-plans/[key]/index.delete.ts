import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  console.log('lesson_plan DELETE by key', lessonKey)

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from('lesson_plans')
    .delete()
    .eq('public_key', lessonKey)

  if (error) {
    console.error('Something went wrong', error.message)
    return createError({ status: 500, statusText: 'Something went wrong' })
  }
})
