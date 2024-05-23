import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('saving lesson plan details')
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  console.log('saving', body)
  const { data, error } = await client
    .from('lesson_plans')
    .update(body)
    .eq('id', body.id)
    .select()
  if (error) {
    // TODO: handle errors
    console.error(error)
  }
  // TODO: is data single or array?
  console.log('saved as', data)
  return data
})