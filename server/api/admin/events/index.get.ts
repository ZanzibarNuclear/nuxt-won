import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // extract query parameters from URL
  const requestQuery = getQuery(event)
  const {
    page = 1,
    limit = 10,
    order = 'created_at',
    asc = false,
    actor,
  } = requestQuery || {}

  const client = await serverSupabaseClient(event)

  // start with base query
  let dbQuery = client
    .from('events')
    .select('*')
    .order(order as string, { ascending: asc as boolean })

  // add pagination
  if (page && limit) {
    dbQuery.range((page - 1) * limit, page * limit - 1)
  }

  if (actor) {
    dbQuery.eq('actor', actor)
  }

  const { data: eventRows } = await dbQuery

  return eventRows
})
