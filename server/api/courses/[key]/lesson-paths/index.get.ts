import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseKey = getRouterParam(event, 'key')
  console.log('lesson paths GET for course', courseKey ? courseKey : 'any')

  const client = await serverSupabaseClient(event)
  let paths
  if (courseKey) {
    const results = await client
      .from('lesson_paths')
      .select('*')
      .eq('course_key', courseKey)
    paths = results.data
  } else {
    const results = await client.from('lesson_paths').select('*')
    paths = results.data
  }

  return paths
})
