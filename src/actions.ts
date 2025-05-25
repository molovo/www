'use server'

import { ServerClient } from 'postmark'
import { MessageSendingResponse } from 'postmark/dist/client/models'

export const contactSubmit = async (data: FormData) => {
  const client = new ServerClient(process.env.POSTMARK_API_KEY as string)

  try {
    const response: MessageSendingResponse = await client.sendEmail({
      To: process.env.CONTACT_FORM_EMAIL_TO as string,
      From: process.env.CONTACT_FORM_EMAIL_FROM as string,
      ReplyTo: data.get('email') as string,
      Subject: 'Contact form submission from molovo.co',
      TextBody: data.get('message') as string,
      MessageStream: 'outbound',
    })
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: {
        message: 'Message could not be sent',
      },
    }
  }

  return { success: true, message: 'Message sent' }
}
