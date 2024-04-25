import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { main, quotes, auth, mail } from '@/routes'

const app = new Hono()
app.use('*', cors())

app.notFound(c => c.text('AgroComm - Rota não encontrada', 404))
app.route('/', main)
app.route('/quotes', quotes)
app.route('/auth', auth)
app.route('/mail', mail)

export default { port: 4000, fetch: app.fetch }