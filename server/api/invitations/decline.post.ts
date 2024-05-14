import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const referralCode = getRouterParam(event, 'referral_code')

  console.log('Hard decline invitation: ' + referralCode)

  const { data, error } = await client
    .from('invitations')
    .update({ unsubscribed_at: new Date() })
    .eq('referral_code', referralCode)

  if (error) {
    console.error(error)
    return 'Houston, we had a problem.'
  }
})
