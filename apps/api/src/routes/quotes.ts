import { Hono } from 'hono'
import { addPrice, allPrices, pricesByState } from '@/services/quotes'

const app = new Hono()

app.get('/:commodity', async c => {
  const { commodity } = c.req.param()
  const state = c.req.query('estado')

  if (state) {
    const data = await pricesByState(commodity, state)
    return c.json(data, 200)
  } else {
    const data = await allPrices(commodity)
    return c.json(data, 200)
  }  
})

app.get('/:commodity/:state', async c => {
  const { commodity, state } = c.req.param()
  const data = await pricesByState(commodity, state)
  return c.json(data, 200)
})

app.post('/', async c => {
  try {
    const { price, commodity, city, state } = await c.req.json()
    const data = addPrice(price, commodity, city, state)
    return c.json({ message: 'Quote created', quote: data }, 201)
  } catch (error) {
    return c.json({ message: 'Error creating quote' }, 400)    
  }
})

export { app as quotes }