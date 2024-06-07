import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  // filter out any unwanted properties
  const { public_key, name, description, course_key, trailhead } = body
  const input = {
    public_key,
    name,
    description,
    course_key,
    trailhead,
  }
  console.log('create lesson path', input)
  const { data, error } = await client
    .from('lesson_paths')
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
