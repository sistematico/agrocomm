import Fastify from 'fastify'
import cors from '@fastify/cors'
import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './scrape.js'
import * as dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({logger:{level: process.env.LOG_LEVEL}})
await fastify.register(cors, {origin: true})

fastify.get('/arroba-do-boi', async (request, reply) => {
  const data = await arrobaDoBoi()
  
  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(data)
})

fastify.get('/arroba-da-vaca', async (request, reply) => {
  const data = await arrobaDaVaca()
  
  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(data)
})

fastify.get('/milho', async (request, reply) => {
  const data = await milho()
  
  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(data)
})
fastify.get('/soja', async (request, reply) => {
  const data = await soja()
  
  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(data)
})

fastify.get('/arroba-do-boi/:estado', function (request, reply) {
  const { estado } = request.params
})

fastify.get('*', function (request, reply) {
  reply.send({ erro: 'Esta rota não existe' })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()