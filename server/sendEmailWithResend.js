/* for reference */
import { Resend } from 'resend'

const resend = new Resend('re_EU9FxbK8_DV4jv67igsAtZXG1UELmFaTY')

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'zanzisworld42@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
})
