import nodemailer from 'nodemailer'
import Email from 'email-templates'
import type { EmailMessage } from '@/types'

const iCloudTransport = nodemailer.createTransport({
  service: 'iCloud',
  auth: {
    user: Bun.env.ICLOUD_USER,
    pass: Bun.env.ICLOUD_PASSWORD,
  }
})

const email = new Email({
  message: { from: Bun.env.EMAIL_ADDR },
  send: true,
  transport: iCloudTransport
})

export async function sendEmail(to: string, locals: EmailMessage, template = 'welcome') {
  const sended = await email
    .send({
      template,
      message: { to },
      locals
    })
    .then(console.log)
    .catch(console.error)

  return sended
}