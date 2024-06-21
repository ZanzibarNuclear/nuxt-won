import { serverSupabaseClient } from '#supabase/server'
import { ContentPart } from '~/types/won-types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const sequenceUpdates = body

  const results: ContentPart[] = []
  await Promise.all(
    sequenceUpdates.map(async (update) => {
      const { data, error } = await client
        .from('lesson_content_parts')
        .update({ sequence: update.sequence })
        .eq('id', update.id)
        .select()

      if (data) {
        results.push(data[0])
      } else if (error) {
        console.error(error.message)
        throw createError({ status: 500, statusText: 'Something went wrong' })
      }
    })
  )
  return results
})
