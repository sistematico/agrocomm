import { Hono } from 'hono'

const app = new Hono()

app.post('/login', (c) => { 
  return c.text('Login Route', 201)
})

app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export { app as auth }