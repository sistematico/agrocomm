import { Hono } from 'hono'
import { getQuotes } from '@/services/quotes.services'

const quotes = new Hono()

quotes.get('/', (c) => c.json('list quotes'))

// quotes.post('/', (c) => c.json('create an quote', 201))

quotes.get('/:type', async (c) => {
  const quoteType = c.req.param('type')
  const data = await getQuotes(quoteType)
  return c.json(data)
})

export { quotes }