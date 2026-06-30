import type {FastifyInstance, RouteShorthandOptions} from "fastify";
import transformOptimal from "../transformers/optimalTransformer.ts";
import type {ICleanEnergyInterval, IGenerationResponse, IOptimalQuery} from "../types.ts";
import getGeneration from "../services/apiClient.ts";


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
    fastify.get<{Querystring: IOptimalQuery}>('/optimal', opts, async (request, reply) => {
        const chargeHours: number = request.query.chargeHours;
        const generationResponse: IGenerationResponse = await getGeneration(); // todo: adjust duration
        const interval: ICleanEnergyInterval = transformOptimal(generationResponse, chargeHours);
        return interval;
    })
}