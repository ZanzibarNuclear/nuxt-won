import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const { referralCode } = body

  console.log('Hard decline invitation: ' + referralCode)

  const { data: invitation, error } = await client
    .from('invitations')
    .update({ unsubscribed_at: new Date() })
    .eq('referral_code', referralCode)
    .select()

  if (error) {
    console.error(error)
    return 'Houston, we had a problem.'
  }
  return invitation[0]
})
