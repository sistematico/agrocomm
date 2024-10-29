import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'AgroComm API' }, 200)
})

export { app as main }