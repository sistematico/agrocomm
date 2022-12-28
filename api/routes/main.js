export async function mainRoutes(fastify, opts, done) {
  fastify.get('*', function (request, reply) {
    reply.send({ erro: `Esta rota não existe, use ${url}/boi por exemplo.` })
  })

  done()
}