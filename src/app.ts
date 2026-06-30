import fastify from "fastify";
import routes from "./routes/index.ts";

export default function buildApp() {
    const app = fastify({logger: true});
    app.register(routes)
    return app;
}
