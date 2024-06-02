import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const sequenceUpdates = body
  console.log(sequenceUpdates)

  const results = []
  sequenceUpdates.forEach(async (row) => {
    const { data, error } = await client
      .from('lesson_content_parts')
      .update({ sequence: row.sequence })
      .eq('id', row.id)
      .select()

    if (error) {
      console.error(error.message)
      throw createError({ status: 500, statusText: 'Something went wrong' })
    } else {
      results.push(data)
    }
  })
  console.log('after sequence updates', results)

  return results
})
