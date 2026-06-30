import type {FastifyInstance, RouteShorthandOptions} from "fastify";


const opts: RouteShorthandOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                chargeHours: {
                    type: 'integer',
                    minimum: 1,
                    maximum: 6,
                }
            },
            required: ['chargeHours']
        }
    }
}

export default function optimalRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/optimal', opts, async (request, reply) => {
        return 'Hello World!!!!\n'
    })
}