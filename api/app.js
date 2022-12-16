import Fastify from 'fastify'
import cors from '@fastify/cors'
import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './scrape.js'
import * as dotenv from 'dotenv'
dotenv.config()

const apiUrl = new URL(process.env.API_URL)
// const prefix = process.env.NODE_ENV == 'production' ? '/api' : ''
const prefix = apiUrl.pathname != '/' ? apiUrl.pathname : ''

const fastify = Fastify({logger:{level: process.env.LOG_LEVEL}})
await fastify.register(cors, {origin: true})

fastify.register(function(app, _, done) {
  app.get('/params', function (request, reply) {
    console.log(request.id)
    console.log(request.ip)
    console.log(request.ips)
    console.log(request.hostname)
    console.log(request.url)
    console.log(request.routeOptions.method)
    console.log(request.routeOptions.url)
    console.log(request.routeOptions.attachValidation)
    // request.log.info('some info')
  })

  app.get('/arroba-do-boi', async (request, reply) => {
    const data = await arrobaDoBoi()

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/arroba-da-vaca', async (request, reply) => {
    const data = await arrobaDaVaca()

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
  app.get('/soja', async (request, reply) => {
    const data = await soja()

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/arroba-do-boi/:estado', function (request, reply) {
    const { estado } = request.params
  })

  app.get('*', function (request, reply) {
    reply.send({ erro: 'Esta rota não existe' })
  })

  done()
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
