import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  console.log('loading parts for lesson', id)

  const client = await serverSupabaseClient(event)

  if (id) {
    const { data: contentParts } = await client
      .from('lesson_content_parts')
      .select()
      .eq('lesson_id', parseInt(id))

    console.log(contentParts)

    // return whatever found, empty list if nothing
    return contentParts
  } else {
    throw createError({ status: 400, statusText: 'Missing lesson ID' })
  }
})
