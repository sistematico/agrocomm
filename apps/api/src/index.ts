import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { main, users, quotes } from '@/routes'

const app = new Hono()

app.use('*', cors())

app.notFound((c) => c.json({ message: 'Rota não encontrada' }, 404))

app.route('/', main)
app.route('/users', users)
app.route('/quotes', quotes)

export default { 
  port: 4000, 
  fetch: app.fetch
}