import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const stepId = getRouterParam(event, 'id')
  const body = await readBody(event)
  console.log('lesson step UPDATE by ID', stepId, body)

  // only update teaser; if you don't like the step (from->to), delete it
  const input = {
    teaser: body.teaser,
  }
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('lesson_steps')
    .update(input)
    .eq('id', stepId)
    .select()

  if (error) {
    throw createError({
      status: 500,
      statusText: `${error.code} : ${error.message}`,
    })
  }
  return data[0]
})
