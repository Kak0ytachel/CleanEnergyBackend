import type {FastifyInstance} from "fastify";

export default function optimalRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/optimal', async (request, reply) => {
        return 'Hello World!!!!\n'
    })
}