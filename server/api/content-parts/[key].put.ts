import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const key = getRouterParam(event, 'key')
  console.log('saving lesson content part', body)

  if (key !== body.public_key) {
    throw createError({ status: 400, statusText: 'key mismatch' })
  }

  const { data, error } = await client
    .from('lesson_content_parts')
    .update(body)
    .eq('public_key', body.public_key)
    .select()
  if (error) {
    // TODO: handle errors
    console.error(error)
  }
  // TODO: is data single or array?
  console.log('saved as', data)
  return data
})
