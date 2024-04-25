import { Hono } from 'hono'
import { geo } from '@/services/geoip.services'

const app = new Hono()

app.get('/', async c => c.text('AgroComm API - Rota principal'))
app.post('/', async c => c.text('AgroComm API - POST', 201))

app.get('/geoip', async c => {
  try {
    const json = await c.req.parseBody()
    console.log(JSON.stringify(json), json, json['ip'], typeof json)    
    return c.text(JSON.stringify(json))    
  } catch (error) {
    return c.text('No IP provided')
  }
})

export { app as main }