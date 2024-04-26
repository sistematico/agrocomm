import { Hono } from 'hono'
// import { jwt } from 'hono/jwt'
import { login, register } from '@/services/auth.services'

const app = new Hono()

app.get('*', (c) => c.text('AgroComm API - Rota de autenticação'))

// app.use('/auth/*', (c, next) => {
//   const jwtMiddleware = jwt({ secret: Bun.env.JWT_SECRET! })
//   return jwtMiddleware(c, next)
// })

app.post('/signin', async (c) => { 
  try {
    const { identifier, password } = await c.req.json() 
    if (!identifier || !password) throw new Error('Campos obrigatórios')
    const user = await login(identifier, password)
    return c.text(`Sucesso ${JSON.stringify(user)}`, 201)   
  } catch (error) {
    return c.text('Erro ao analizar JSON', 201)    
  }
})

app.post('/signup', async (c) => { 
  // try {
    const { username, email, password } = await c.req.json() 
    if (!username || !email || !password) throw new Error('Campos obrigatórios')
    const user = await register(username, email, password)
    console.log(user)
    return c.text(`Sucesso ${JSON.stringify(user)}`, 201)   
  // } catch (error) {
    // return c.text('Erro ao analizar JSON', 201)    
  // }
})

export { app as auth }