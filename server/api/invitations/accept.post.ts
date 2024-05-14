import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const { referralCode } = body

  console.log('Accept invitation: ' + referralCode)

  const { data: invitation, error } = await client
    .from('invitations')
    .update({ confirmed_at: new Date() })
    .eq('referral_code', referralCode)
    .select()

  if (error) {
    console.error(error)
    return '<p>Houston, we had a problem. Sorry about that.</p>'
  }
  return invitation[0]
})
