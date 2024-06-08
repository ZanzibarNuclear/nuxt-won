import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const lessonPathKey = getRouterParam(event, 'path_key')

  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  // filter out any unwanted properties
  const { from, to, teaser } = body
  const input = {
    lesson_path: lessonPathKey,
    from,
    to,
    teaser,
  }
  console.log('create lesson path', input)
  const { data, error } = await client
    .from('lesson_steps')
    .insert(input)
    .select()

  if (error) {
    throw createError({
      status: 500,
      statusText: `${error.code} : ${error.message}`,
    })
  }
  return data[0]
})
