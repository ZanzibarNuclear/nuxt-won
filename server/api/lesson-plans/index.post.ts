import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const { data, error } = await client
    .from('lesson_plans')
    .insert(body)
    .select()

  if (error) {
    throw createError({ status: 500, statusText: 'Something went wrong' })
  }
  return data
})
