import { Resend } from 'resend'

const config = useRuntimeConfig()

/**
 * Records an invitation request in DB, and sends an email.
 * Need a way to flag when recipient wants to "unsubscribe". Use that
 * list to filter recipients.
 *
 * There's probably a lot more to think through.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { friendEmail, solicitorAlias, topicKey } = body

  // check required fields
  if (!(friendEmail && solicitorAlias && topicKey)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'One or more required fields are missing',
    })
  }

  const from = 'World of Nuclear <moderator@support.worldofnuclear.com>'
  const subject = `${solicitorAlias} wants you to respond`
  const message = `<strong>World of Nuclear - What Say You?</strong> Click here to <a href="${config.public.baseUrl}/wsy?topic=${topicKey}">Join the discussion.</a>`

  const resend = new Resend(config.wsyInvitationsResendKey)
  const { data, error } = await resend.emails.send({
    from,
    to: [friendEmail],
    subject,
    html: message,
  })

  if (error) {
    console.error({ error })
    return { success: false }
  }

  // TODO: figure out better response protocol
  console.log(data)
  return { success: true }
})
