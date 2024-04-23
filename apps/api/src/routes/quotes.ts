import { Hono } from 'hono'
import { getQuotes } from '@/services/quotes.services'

const app = new Hono()

app.get('/', (c) => c.json('list quotes'))

app.get('/:type', async (c) => {
  try {
    const quoteType = c.req.param('type')
    const data = await getQuotes(quoteType)
    return c.json(data)    
  } catch (error) {
    return c.json({ message: 'No quotes.' })
  }
})

export { app as quotes }