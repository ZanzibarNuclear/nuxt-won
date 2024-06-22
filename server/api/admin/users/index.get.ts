import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // extract query parameters from URL
  const requestQuery = getQuery(event)
  const {
    page = 1,
    limit = 10,
    order = 'joined_at',
    asc = false,
    screen_name,
  } = requestQuery || {}

  console.log('Using screen name "' + screen_name + '"')

  const client = await serverSupabaseClient(event)

  // start with base query
  let dbQuery = client
    .from('profiles')
    .select('*')
    .order(order as string, { ascending: asc as boolean })

  // add pagination
  if (page && limit) {
    dbQuery.range((page - 1) * limit, page * limit - 1)
  }

  if (screen_name) {
    dbQuery.eq('screen_name', decodeURI(screen_name))
  }

  const { data: eventRows } = await dbQuery

  return eventRows
})
