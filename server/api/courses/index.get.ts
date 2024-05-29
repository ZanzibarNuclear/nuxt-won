import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('courses GET')
  const client = await serverSupabaseClient(event)
  const { data: courses } = await client.from('courses').select('*')
  return courses
})
