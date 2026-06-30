import type {FastifyInstance} from "fastify";
import type {IGenerationResponse, IStats} from "../types.ts";
import getGeneration from "../services/apiClient.ts";
import transformStats from "../transformers/statsTransformer.ts";

export default function statsRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/stats', async (request, reply) => {
        const generationResponse: IGenerationResponse = await getGeneration();
        const stats: IStats = await transformStats(generationResponse);
        return stats;
    })
}