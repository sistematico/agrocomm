import { Hono } from 'hono'
import { sendMail } from '@/services/mail.services'

const app = new Hono()

app.get('*', (c) => c.text('AgroComm API - Rota de E-mail'))

app.post('/send', async (c) => { 
  try {
    let { name, email, subject, text } = await c.req.json() 
    if (!email || !subject || !text) return c.text('Campos obrigatórios', 500)   
    if (!name) name = 'Anônimo'
    const mail = await sendMail(name, email, subject, text).then(m => m).catch(e => e)
    return c.text('E-mail enviado com sucesso', 200)       
  } catch (error) {
    return c.text('Erro ao enviar e-mail', 500)    
  }
})

export { app as mail }