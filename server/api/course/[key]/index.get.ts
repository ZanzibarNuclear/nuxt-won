import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('courses GET by key')
  console.log(event.context.params)
  const courseKey = getRouterParam(event, 'key')
  console.log('Public key is', courseKey)

  const client = await serverSupabaseClient(event)

  const { data: courses } = await client
    .from('courses')
    .select()
    .eq('public_key', courseKey)
  if (courses && courses.length > 0) {
    console.log('found', courses)
    return courses[0]
  } else {
    console.log('not found')
    return null
    // throw createError({ status: 404, statusText: 'Not found' })
  }
})
