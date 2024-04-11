import { Hono } from 'hono'
import { login, register } from '@/services/auth.services'

const app = new Hono()

app.get('*', (c) => c.text('AgroComm API - Rota de autenticação'))

app.post('/signin', async (c) => { 
  try {
    const { identifier, password } = await c.req.json() 
    // if (!identifier || !password) throw new Error('Campos obrigatórios')
    const user = await login(identifier, password)
    return c.text(`Sucesso ${user}`, 201)   
  } catch (error) {
    return c.text('Erro ao analizar JSON', 201)    
  }
})

app.post('/signup', (c) => { 
  return c.text('Sign-up Route', 201)
})

export { app as auth }