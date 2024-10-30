import { Hono } from 'hono'
import { signup, signin, users } from '@/services/users'

const app = new Hono()

app.get('/', async (c) => {
  const data = await users()
  return c.json(data, 200)
})

app.post('/signup', async (c) => {
  try {
    const { username, email, password } = await c.req.json()
    const data = await signup(username, email, password)
    return c.json(data, 201)
  } catch (error) {
    return c.json({ message: 'Error creating user' }, 400)    
  }
})

app.post('/signin', async (c) => {
  try {
    const { identifier, password } = await c.req.json()
    const data = await signin(identifier, password)
    return c.json(data, 200)
  } catch (error) {
    return c.json({ message: 'Error logging', error }, 400)    
  }
})

export { app as users }