import { Hono } from 'hono'
import { geoIp } from '@/services/geoip.services'

const app = new Hono()

app.get('/', async c => c.text('AgroComm API - Rota principal'))
app.post('/', async c => c.text('AgroComm API - POST', 201))

app.get('/geo/:ip', c => {
    const { ip } = c.req.param()
    const geo = geoIp(ip)
    return c.json(geo)    
})

export { app as main }