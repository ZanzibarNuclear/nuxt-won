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
  const myInvite = invitation[0]
  const { error: unsubError } = await client
    .from('unsubscribed_emails')
    .insert({
      email: myInvite.email,
    })
  if (unsubError) {
    console.error(
      'Problem adding email to unsubscribe list: ' + JSON.stringify(unsubError)
    )
  }

  return myInvite
})
