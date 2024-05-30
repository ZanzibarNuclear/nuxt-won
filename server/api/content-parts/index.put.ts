import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const sequenceUpdates = body.parts
  // expecting [ { id, sequence }, ... ]
  const { data, error } = await client
    .from('lesson_content_parts')
    .upsert(sequenceUpdates)
    .select()

  if (error) {
    throw createError({ status: 500, statusText: 'Something went wrong' })
  }
  return data
})
