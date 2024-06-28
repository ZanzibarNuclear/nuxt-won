import { Resend } from 'resend'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { context, message } = body
  const { adminEmail } = config

  const from = 'World of Nuclear (system) <system@support.worldofnuclear.com>'
  const subject = `(${context}) we got feedback. Hurray!!`

  const resend = new Resend(config.wsyInvitationsResendKey)
  const { data, error: sendError } = await resend.emails.send({
    from,
    to: [adminEmail],
    subject,
    html: message,
  })

  if (sendError) {
    console.error({ sendError })
    return { success: false }
  } else {
    console.log(data)
    return { success: true }
  }
})
