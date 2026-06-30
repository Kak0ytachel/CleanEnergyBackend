import type {FastifyInstance} from "fastify";
import statsRoute from "./stats.ts";
import optimalRoute from "./optimal.ts";

export default function routes(fastify: FastifyInstance, options: Object) {
    fastify.register(statsRoute);
    fastify.register(optimalRoute);
}
