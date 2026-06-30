import buildApp from "./app.ts";

const app = buildApp();

// todo: add env var for port
app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})