import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonPathKey = getRouterParam(event, 'path_key')
  const body = await readBody(event)
  console.log('lesson path PUT', lessonPathKey, body)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_paths')
    .update(body)
    .eq('public_key', lessonPathKey)
    .select()

  if (error) {
    throw createError({
      status: 500,
      statusText: `${error.code} : ${error.message}`,
    })
  }
  return data
})
