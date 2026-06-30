import fastify from "fastify";
import routes from "./routes/index.ts";

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
    return app;
}
