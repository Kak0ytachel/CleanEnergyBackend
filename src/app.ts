import fastify from "fastify";
import routes from "./routes/index.ts";
import {fastifyCors} from "@fastify/cors";

export default function buildApp() {
    const app = fastify({
        logger: {
            transport: {
                target: 'pino-pretty'
            },
            level: 'debug',
            },
        });
    app.register(routes)
    app.register(fastifyCors)
    return app;
}
