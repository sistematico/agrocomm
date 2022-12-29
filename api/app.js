import Fastify from 'fastify'
import { mainRoutes, agriculturaRoutes, pecuariaRoutes } from './routes/index.js'
import cors from '@fastify/cors'
import RequestIp from '@supercharge/request-ip'
import geoip from 'geoip-lite'
import { arquivo, ultimas } from './lib/stats.js'
import { counter } from './lib/utils.js'
import * as dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({ logger: { level: process.env.LOG_LEVEL } })
await fastify.register(cors, { origin: true })

fastify.get('/hits', async (request, reply) => {
  const data = counter()

  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ visitas: data })
})

fastify.get('/ultimas', async (request, reply) => {
  const data = ultimas()
  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/arquivo', async (request, reply) => {
  const data = arquivo()
  return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
})

fastify.get('/geo', function (request, reply) {
  let ip

  if (process.env.NODE_ENV === 'production') ip = RequestIp.getClientIp(request)
  if (process.env.NODE_ENV !== 'production') ip = '177.43.78.177'

  const { geo } = geoip.lookup(ip)
  
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(geo)
})

fastify.register(mainRoutes)
fastify.register(agriculturaRoutes)
fastify.register(pecuariaRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()