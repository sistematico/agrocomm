import { Hono } from 'hono'
import { getQuotes } from '@/services/quotes.services'

const app = new Hono()

app.get('/', (c) => c.json('list quotes'))

app.get('/:type', async (c) => {
  const quoteType = c.req.param('type')
  const data = await getQuotes(quoteType)
  return c.json(data)
})

export { app as quotes }