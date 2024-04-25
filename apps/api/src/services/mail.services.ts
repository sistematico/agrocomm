import nodemailer from 'nodemailer'

const sender = {
  to: '"' + Bun.env.APP_NAME + '"' + ' <' + Bun.env.MAIL_ADDR + '>',
  name: Bun.env.APP_NAME,
  email: Bun.env.MAIL_ADDR
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Bun.env.MAIL_ADDR,
    pass: Bun.env.MAIL_PASS
  }
})

async function send(from: string, to: string, subject: string, text: string) {
  return await transporter.sendMail({ from, to, subject, text })
}

export async function sendMail(name: string, email: string, subject: string, text: string) {
  const sended = await send(`"${name}" <${email}>`, sender.email, subject, text)
  return sended
}