import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  console.log('add course to library', body)

  const { data, error } = await client.from('courses').insert(body).select()
  if (error) {
    // TODO: handle errors
    console.error(error)
  }
  // TODO: is data single or array?
  console.log('saved as', data)
  return data
})
