import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonKey = getRouterParam(event, 'key')
  console.log('loading parts for lesson', lessonKey)

  const client = await serverSupabaseClient(event)
  const { data: contentParts } = await client
    .from('lesson_content_parts')
    .select('*, lesson_plans!inner (public_key)')
    .eq('lesson_plans.public_key', lessonKey)

  return contentParts
})
