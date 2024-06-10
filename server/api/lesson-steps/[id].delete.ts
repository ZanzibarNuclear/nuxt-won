import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const stepId = getRouterParam(event, 'id')
  console.log('lesson step DELETE by ID', stepId)

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from('lesson_steps')
    .delete()
    .eq('id', parseInt(stepId))

  if (error) {
    throw createError({
      status: 500,
      statusText: `${error.code} : ${error.message}`,
    })
  }
})
