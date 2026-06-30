import type {FastifyInstance} from "fastify";

export default function statsRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/stats', async (request, reply) => {
        return 'Hello World\n'
    })
}