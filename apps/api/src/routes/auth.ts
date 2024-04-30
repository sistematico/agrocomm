import { Hono } from 'hono'
import { login, register } from '@/services/auth.services'

const app = new Hono()

app.get('*', (c) => c.text('AgroComm API - Rota de autenticação'))

app.post('/signin', async (c) => { 
  try {
    const { identifier, password } = await c.req.json() 
    if (!identifier || !password) throw new Error('Campos obrigatórios')
    const user = await login(identifier, password)
    return c.json({ message: user }, 200)   
  } catch (error) {
    return c.json({ message: error }, 500)   
  }
})

app.post('/signup', async (c) => { 
  const { username, email, password } = await c.req.json() 
  if (!username || !email || !password) throw new Error('Campos obrigatórios')
  const user = await register(username, email, password)
  console.log(user)
  return c.json({ message: user }, 201)   
})

export { app as auth }