import Fastify from 'fastify'
import { mainRoutes } from './routes/main.js'
import cors from '@fastify/cors'
import RequestIp from '@supercharge/request-ip'
import geoip from 'geoip-lite'
import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './lib/scrape.js'
import { arquivo, ultimas } from './lib/stats.js'
import { counter } from './lib/utils.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.API_URL ?? 'https://api.agrocomm.com.br'
const fastify = Fastify({ logger: { level: process.env.LOG_LEVEL } })
await fastify.register(cors, { origin: true })

const boiRoutes = ['/boi', '/arroba-do-boi']
const vacaRoutes = ['/vaca', '/arroba-da-vaca']

fastify.get('/hits', async (request, reply) => {
  const data = counter()
  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ visitas: data })
})

fastify.get('/ultimas', async (request, reply) => {
  const data = ultimas()
  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/arquivo', async (request, reply) => {
  const data = arquivo()
  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

boiRoutes.forEach(async (path) => {
  fastify.get(path, async (request, reply) => {
    const data = await arrobaDoBoi()
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })
})

fastify.get('/arroba-do-boi/:estado', async (request, reply) => {
  const { estado } = request.params
  const data = await arrobaDoBoi(estado)

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

vacaRoutes.forEach(async (path) => {
  fastify.get(path, async (request, reply) => {
    const data = await arrobaDaVaca()

    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })
})

fastify.get('/arroba-da-vaca/:estado', async (request, reply) => {
  const { estado } = request.params
  const data = await arrobaDaVaca(estado)

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/milho', async (request, reply) => {
  const data = await milho()

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/milho/:estado', async (request, reply) => {
  const { estado } = request.params
  const data = await milho(estado)

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/soja', async (request, reply) => {
  const data = await soja()

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/soja/:estado', async (request, reply) => {
  const { estado } = request.params
  const data = await soja(estado)

  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/geo', function (request, reply) {
  let ip = '177.43.78.177'
  if (process.env.NODE_ENV == 'production') ip = RequestIp.getClientIp(request)
  const geo = geoip.lookup(ip)
  reply.send({ geo })
})

fastify.register(mainRoutes, { prefix: '' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
