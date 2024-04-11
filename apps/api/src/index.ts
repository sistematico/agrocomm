import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { main, auth, quotes } from '@/routes'

const app = new Hono()

app.use('*', cors())
app.route('/', main)
app.route('/quotes', quotes)
app.route('/auth', auth)
app.get('/', c => c.text('AgroComm API'))

export default { port: 4000, fetch: app.fetch }