import { verifyRecaptcha } from '@superrb/next-addons/server'
import { NextRequest } from 'next/server'
import FormData from 'form-data' // form-data v4.0.1
import Mailgun from 'mailgun.js' // mailgun.js v11.1.0

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'API_KEY',
  // When you have an EU-domain, you must specify the endpoint:
  url: 'https://api.eu.mailgun.net',
})

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { email, message, recaptchaToken } = data

  try {
    await verifyRecaptcha(
      recaptchaToken as string,
      process.env.RECAPTCHA_SECRET_KEY as string,
      process.env.RECAPTCHA_MINSCORE as string,
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: { message: 'Recaptcha validation failed' },
      },
      {
        status: 400,
      },
    )
  }

  try {
    const response = await mg.messages.create('molovo.co', {
      from: process.env.CONTACT_FORM_EMAIL_FROM as string,
      to: [process.env.CONTACT_FORM_EMAIL_TO as string],
      replyTo: email as string,
      subject: 'New message from Molovo website.',
      text: `
          New message from ${email} via Molovo website:

          ${message}
        `,
    })
  } catch (err) {
    console.error(err)
    return Response.json(
      {
        success: false,
        error: {
          message: 'Message could not be sent',
        },
      },
      {
        status: 500,
      },
    )
  }

  return Response.json({ success: true, message: 'Message sent' })
}
