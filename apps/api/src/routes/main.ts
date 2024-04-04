import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list quotes'))
app.post('/', (c) => c.json('create an quote', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export { app as main }