'use server'

import { NextResponse } from 'next/server'
import { ServerClient } from 'postmark'
import { MessageSendingResponse } from 'postmark/dist/client/models'

export const contactSubmit = async (formData: FormData) => {
  const data = {
    message: formData.get('message') as string,
    email: formData.get('email') as string,
  }

  const client = new ServerClient(process.env.POSTMARK_API_KEY as string)

  try {
    const response: MessageSendingResponse = await client.sendEmail({
      To: process.env.CONTACT_FORM_EMAIL_TO as string,
      From: process.env.CONTACT_FORM_EMAIL_FROM as string,
      ReplyTo: data.email,
      Subject: 'Contact form submission from molovo.co',
      TextBody: data.message,
      MessageStream: 'outbound',
    })

    console.log(response)
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: {
        message: 'Message could not be sent',
      },
    }
  }

  console.log('Message sent')
  return { success: true, message: 'Message sent' }
}
