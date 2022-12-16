import { arrobaDoBoi, arrobaDaVaca, milho, soja } from './scrape.js'
import { prodRoutes } from './routes.js'
import * as dotenv from 'dotenv'
dotenv.config()

async function prodRoutes(fastify, opts, done) {
  fastify.get('/env', async (request, reply) => {
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ env: 'OK' })
  })
  done()
}

export { prodRoutes }