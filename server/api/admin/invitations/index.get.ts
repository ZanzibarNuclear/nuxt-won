import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const requestQuery = getQuery(event)
  const {
    page = 1,
    limit = 10,
    order = 'created_at',
    asc = false,
  } = requestQuery || {}

  console.log('look for invitations: %d %d %s', page, limit, order)

  const client = await serverSupabaseClient(event)

  // start with base query
  let dbQuery = client
    .from('invitations')
    .select('*')
    .order(order as string, { ascending: asc as boolean })

  // add pagination
  if (page && limit) {
    dbQuery.range((page - 1) * limit, page * limit - 1)
  }

  // TODO: figure out what filters make sense
  // if (actor) {
  //   dbQuery.eq('actor', actor)
  // }

  const { data: eventRows } = await dbQuery

  console.log('found invitations', eventRows)

  return eventRows
})
