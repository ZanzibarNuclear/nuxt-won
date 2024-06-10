import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonPathKey = getRouterParam(event, 'path_key')
  console.log('loading steps for path', lessonPathKey)

  const client = await serverSupabaseClient(event)
  const { data: lessonSteps } = await client
    .from('lesson_steps')
    .select()
    .eq('lesson_path', lessonPathKey)

  return lessonSteps
})
