import { serverSupabaseClient } from '#supabase/server'
import { toCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const requestQuery = getQuery(event)
  const {
    page,
    limit,
    order = 'created_at',
    asc = false,
    threadKey,
  } = requestQuery || {}

  console.log('get filtered entries: %d %d %s', page, limit, order)

  const client = await serverSupabaseClient(event)

  // start with base query
  let dbQuery = client
    .from('say_entries')
    .select('*')
    .eq('thread_key', threadKey)
    .order(order as string, { ascending: asc as boolean })

  // add pagination
  if (page && limit) {
    dbQuery.range((page - 1) * limit, page * limit - 1)
  }

  const { data, error } = await dbQuery
  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve entries`,
    })
  }
  return data?.map((row) => toCamelCase(row))
})
