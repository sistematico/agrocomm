import { readdirSync } from 'fs'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import RequestIp from '@supercharge/request-ip'
import geoip from 'geoip-lite'
import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './scrape.js'
import { readFiles, jsonDir } from './utils.js'
import * as dotenv from 'dotenv'
dotenv.config()

const prefix = process.env.NODE_ENV == 'production' ? '/api' : ''
const fastify = Fastify({logger:{level: process.env.LOG_LEVEL}})
await fastify.register(cors, {origin: true})

fastify.register(function(app, _, done) {
  app.get('/files', async (request, reply) => {
    let meses = [], dias = []

    // const getDirectories = source =>
    //   readdirSync(source, { withFileTypes: true })
    //     .filter(dirent => dirent.isDirectory())
    //     .map(dirent => dirent.name)
    const getDirectories = source =>
      readdirSync(source, { recursive: true, withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    let anos = getDirectories('./json')
    
    // meses = anos.forEach((ano) => {
    //   getDirectories('./json/' + ano)
    // })
    
    // dias = anos.forEach((ano) => {
    //   ano.forEach((mes) => {
    //     getDirectories(mes)
    //   })
    // })




    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(anos)
  })

  app.get('/arroba-do-boi', async (request, reply) => {
    const data = await arrobaDoBoi()

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  app.get('/arroba-do-boi/:estado', async (request, reply) => {
    const { estado } = request.params
    const data = await arrobaDoBoi(estado)

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
