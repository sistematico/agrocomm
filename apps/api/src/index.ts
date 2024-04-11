import { Hono } from 'hono'
import { main, quotes } from '@/routes'

const app = new Hono()

app.route('/', main)
app.route('/quotes', quotes)
app.get('/', c => c.text('AgroComm API'))

export default { port: 4000, fetch: app.fetch }