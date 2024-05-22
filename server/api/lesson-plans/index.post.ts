import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('add lesson plan')
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  console.log('saving', body)
  const { data, error } = await client.from('lesson_plan').insert(body).select()
  if (error) {
    console.error(error.message)
    throw createError({ status: 500, statusText: 'Something went wrong' })
  }
  console.log('saved as', data)
  return data
})
