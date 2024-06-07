import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonPathKey = getRouterParam(event, 'path_key')
  console.log('lesson path GET by key', lessonPathKey)

  const client = await serverSupabaseClient(event)
  const { data: paths } = await client
    .from('lesson_paths')
    .select()
    .eq('public_key', lessonPathKey)

  return paths
})
