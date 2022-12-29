import { arrobaDoBoi, arrobaDaVaca, milho, soja } from '../lib/scrape.js'

const boiRoutes = ['/boi', '/arroba-do-boi']
const vacaRoutes = ['/vaca', '/arroba-da-vaca']
let data = null

export async function mainRoutes(fastify, opts, done) {
  fastify.get('*', function (request, reply) {
    reply.send({ erro: `Esta rota não existe.` })
  })

  done()
}


export async function agriculturaRoutes(fastify, opts, done) {
  fastify.get('/milho', async (request, reply) => {
    data = await milho()
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })

  fastify.get('/:estado/milho', async (request, reply) => {
    const { estado } = request.params
    data = await milho(estado)
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })

  fastify.get('/soja', async (request, reply) => {
    data = await soja()
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })

  fastify.get('/:estado/soja', async (request, reply) => {
    const { estado } = request.params
    data = await soja(estado)
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(data)
  })

  done()
}


export async function pecuariaRoutes(fastify, opts, done) {
  boiRoutes.forEach(async (path) => {
    fastify.get(path, async (request, reply) => {
      data = await arrobaDoBoi()
    
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(data)
    })
  })

  fastify.get('/:estado/boi', async (request, reply) => {
    const { estado } = request.params
    data = await arrobaDoBoi(estado)
    
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  vacaRoutes.forEach(async (path) => {
    fastify.get(path, async (request, reply) => {
      data = await arrobaDaVaca()
    
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(data)
    })
  })

  fastify.get('/:estado/vaca', async (request, reply) => {
    const { estado } = request.params
    data = await arrobaDaVaca(estado)
    
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(data)
  })

  done()
}
