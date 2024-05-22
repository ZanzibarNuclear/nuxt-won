import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('courses GET id')
  console.log(event.context.params)
  const id = getRouterParam(event, 'id')
  console.log('ID is', id)

  const client = await serverSupabaseClient(event)

  const { data: courses } = await client
    .from('courses')
    .select()
    .eq('id', parseInt(id))
  if (courses && courses.length > 0) {
    console.log('found', courses)
    return courses[0]
  } else {
    console.log('not found')
    return null
    // throw createError({ status: 404, statusText: 'Not found' })
  }
})
