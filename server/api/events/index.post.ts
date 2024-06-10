import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  // drop any unexpected stuff
  const input = {
    actor: body.actor,
    details: body.details,
  }

  console.log('saving', body)
  const { data, error } = await client.from('events').insert(input).select()
  if (error) {
    return createError({
      status: 500,
      statusText: error.message,
    })
  }
  return data[0]
})
