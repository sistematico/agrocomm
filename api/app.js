import Fastify from 'fastify'
import cors from '@fastify/cors'
import RequestIp from '@supercharge/request-ip'
import geoip from 'geoip-lite'
import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './scrape.js'
import { arquivo, ultimas } from './lib/stats.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.API_URL ?? 'https://agrocomm.somdomato.com/api'
const prefix = process.env.NODE_ENV == 'production' ? '/api' : ''
const fastify = Fastify({ logger: { level: process.env.LOG_LEVEL } })
await fastify.register(cors, { origin: true })

fastify.register((app, opts, next) => {
  const boiRoutes = ['/boi', '/arroba-do-boi']
  const vacaRoutes = ['/vaca', '/arroba-da-vaca']

  app.get('/ultimas', async (request, reply) => {
    const data = ultimas()
    
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/arquivo', async (request, reply) => {
    const data = arquivo()
    
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  boiRoutes.forEach(async path => {
    app.get(path, async (request, reply) => {
      const data = await arrobaDoBoi()

      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(data)
    })
  })

  app.get('/arroba-do-boi/:estado', async (request, reply) => {
    const { estado } = request.params
    const data = await arrobaDoBoi(estado)

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  vacaRoutes.forEach(async path => {
    app.get(path, async (request, reply) => {
      const data = await arrobaDaVaca()
      
      return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
    })
  })

  app.get('/arroba-da-vaca/:estado', async (request, reply) => {
    const { estado } = request.params
    const data = await arrobaDaVaca(estado)

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/milho', async (request, reply) => {
    const data = await milho()

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/milho/:estado', async (request, reply) => {
    const { estado } = request.params
    const data = await milho(estado)

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/soja', async (request, reply) => {
    const data = await soja()

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/soja/:estado', async (request, reply) => {
    const { estado } = request.params
    const data = await soja(estado)

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/geo', function (request, reply) {
    let ip = '177.43.78.177'
    if (process.env.NODE_ENV == 'production') ip = RequestIp.getClientIp(request)
    const geo = geoip.lookup(ip);
    reply.send({ geo })
  })  

  app.get('*', function (request, reply) {
    reply.send({ erro: `Esta rota não existe, use ${url}/boi por exemplo.` })
  })

  next()
}, { prefix })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
