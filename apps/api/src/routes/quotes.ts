import { Hono } from 'hono'
import { addQuote, quotes } from '@/services/quotes'

const app = new Hono()

// app.get('/', async (c) => {
//   const data = await listAllQuotes()
//   return c.json({ quotes: data }, 200)
// })

// app.get('/:state/:commodity', async (c) => {
app.get('/:commodity/:state?', async (c) => {
  const { commodity, state } = c.req.param()
  
  if (state) {
    const data = await quotes(commodity, state)
    return c.json({ quotes: data }, 200)
  } else {
    const data = await quotes(commodity)
    return c.json({ quotes: data }, 200)
  }  
})



app.post('/', async (c) => {
  try {
    const { price, commodity, city, state } = await c.req.json()
    const data = addQuote(price, commodity, city, state)
    return c.json({ message: 'Quote created', quote: data }, 201)
  } catch (error) {
    return c.json({ message: 'Error creating quote' }, 400)    
  }
})

export { app as quotes }