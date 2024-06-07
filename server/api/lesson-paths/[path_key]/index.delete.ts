import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonPathKey = getRouterParam(event, 'path_key')
  console.log('lesson path DELETE by key', lessonPathKey)

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from('lesson_paths')
    .delete()
    .eq('public_key', lessonPathKey)

  if (error) {
    throw createError({
      status: 500,
      statusText: `${error.code} : ${error.message}`,
    })
  }
})
