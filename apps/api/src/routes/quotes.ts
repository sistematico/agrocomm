import { Hono } from 'hono'

const quotes = new Hono()

quotes.get('/', (c) => c.json('list quotes'))
quotes.post('/', (c) => c.json('create an quote', 201))
quotes.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export { quotes }