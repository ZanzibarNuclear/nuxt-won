import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseKey = getRouterParam(event, 'key')
  const body = await readBody(event)
  console.log('course PUT', courseKey, body)

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('courses')
    .update(body)
    .eq('public_key', courseKey)
    .select()
  if (error) {
    console.error(error)
  }
  return data
})
