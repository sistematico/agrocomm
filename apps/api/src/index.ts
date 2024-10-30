import { Hono } from 'hono'
import { main, users, quotes } from '@/routes'

const app = new Hono()

app.notFound((c) => c.json({ message: 'Rota não encontrada' }, 404))

app.route('/', main)
app.route('/users', users)
app.route('/quotes', quotes)

export default { 
  port: 4000, 
  fetch: app.fetch
}