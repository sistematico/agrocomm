import { Hono } from 'hono'
import { signup, signin, users } from '@/services/users'

const app = new Hono()

app.get('/', async (c) => {
  const allUsers = await users()
  return c.json({ users: allUsers }, 200)
})

app.post('/signup', async (c) => {
  try {
    const { username, password, email } = await c.req.json()
    const user = signup(username, password, email)
    return c.json({ message: 'User created', user }, 201)
  } catch (error) {
    return c.json({ message: 'Error creating user' }, 400)    
  }
})

app.post('/signin', async (c) => {
  try {
    const { username, password, email } = await c.req.json()
    return c.json({ message: 'User created' }, 201)
  } catch (error) {
    return c.json({ message: 'Error creating user' }, 400)    
  }
})

export { app as users }