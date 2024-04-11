import { Hono } from 'hono'

const app = new Hono()

app.get('/', c => c.text('AgroComm API - Rota principal'))
app.post('/', c => c.text('AgroComm API - POST', 201))

export { app as main }