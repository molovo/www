import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { verifySolution } from 'altcha-lib'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { email, message, altchaToken } = data

  try {
    await verifySolution(altchaToken, process.env.ALTCHA_HMAC_KEY as string)
  } catch (error) {
    console.error(error)
    return Response.json({
      success: false,
      error: 'Altcha challenge failed',
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FORM_EMAIL_FROM as string,
    to: process.env.CONTACT_FORM_EMAIL_TO as string,
    replyTo: email as string,
    subject: 'New message from Molovo website.',
    text: `
          New message from ${email} via Molovo website:

          ${message}
        `,
  })

  if (error) {
    console.error(error)
    return Response.json(
      {
        success: false,
        error: 'Message could not be sent',
      },
      {
        status: 500,
      },
    )
  }

  return Response.json({ success: true, message: 'Message sent' })
}
