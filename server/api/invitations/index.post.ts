import { serverSupabaseClient } from '#supabase/server'
import { genKey } from '~/utils'
import { Resend } from 'resend'

const config = useRuntimeConfig()

/**
 * Records an invitation request in DB, and sends an email.
 * Need a way to flag when recipient wants to "unsubscribe". Use that
 * list to filter recipients.
 *
 * There's probably a lot more to think through. See feature description in Notion.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { friendEmail, friendName, solicitorId, solicitorAlias, topicKey } =
    body

  // check required fields
  if (
    !(friendEmail && friendName && solicitorId && solicitorAlias && topicKey)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'One or more required fields are missing',
    })
  }

  const client = await serverSupabaseClient(event)

  // see if email on unsubscribe list
  const { data: unsub, error: unsubError } = await client
    .from('unsubscribed_emails')
    .select()
    .eq('email', friendEmail)
  if (unsub && unsub.length > 0) {
    console.log('This email address has been unsubscribed: ' + friendEmail)
    return { success: true }
  }

  // create invitation record
  const referralCode = genKey(10)
  const target = {
    service: 'wsy',
    topicKey: topicKey,
  }
  const invitationRecord = {
    recommended_by_id: solicitorId,
    name: friendName,
    email: friendEmail,
    referral_code: referralCode,
    target: JSON.stringify(target),
  }
  console.log('invitation record: ', invitationRecord)

  const { data: invitation, error: insertError } = await client
    .from('invitations')
    .insert(invitationRecord)
    .select()

  if (insertError) {
    console.error({ insertError })
    return { success: false }
  }

  const myInvite = invitation[0] // need ID for update once email is sent
  console.log('Invitation: ', invitation)

  const from = 'World of Nuclear <moderator@support.worldofnuclear.com>'
  const subject = `${solicitorAlias} wants you to respond`
  const message = `<p><strong>World of Nuclear - What Say You?</strong></p>
<p>You have been invited to join the discussion forum at Zanzibar's World of Nuclear Energy. 
The person who invited you is known as "${solicitorAlias}" in the forum. We have asked ${solicitorAlias} to contact you, too.</p>
<p>If you are curious to find out why ${solicitorAlias} invited you, please 
<a href="${config.public.baseUrl}/welcome?action=accept&referral_code=${referralCode}">click here, and join the discussion.</a></p>
<p>Of course, feel free to ignore this email if you are not interested. Or take a look later if you change your mind.</p>
<p>Regards,</p>
<p>Dave, your friendly moderator @ <a href="https://worldofnuclear.com">World of Nuclear</a> (https://worldofnuclear.com)</p>
<p>P.S. If you never want to be contacted by World of Nuclear, you can 
<a href="${config.public.baseUrl}/welcome?action=decline&referral_code=${referralCode}">decline this invitation</a>. We will prevent future invitations from being sent.</p>
`

  const resend = new Resend(config.wsyInvitationsResendKey)
  const { data, error: sendError } = await resend.emails.send({
    from,
    to: [friendEmail],
    subject,
    html: message,
  })

  if (sendError) {
    console.error({ sendError })
    return { success: false }
  }

  // TODO: figure out better response protocol
  console.log(data)

  // record sending invitation
  const { data: update, error: updateError } = await client
    .from('invitations')
    .update({ sent_at: new Date() })
    .eq('id', myInvite.id)
    .select()

  if (updateError) {
    console.error({ updateError })
    return { success: false }
  }
  console.log(update[0])

  return { success: true }
})
