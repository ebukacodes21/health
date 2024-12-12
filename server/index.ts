import HealthServer from "./common/server";
import routes from "./route";

const port = process.env.PORT!

// configure db is designed to connect to
// postgreSQL and MongoDB
// instantiate a new server here
const server = new HealthServer()
server.configureDb().then(() => { 
    server.router(routes)
    server.listen(Number(port))
}).catch((error) => {
    console.log(error)
 })

 export default server

// Graceful Shutdown on signals
process.on('SIGINT', async () => {
    console.log('SIGINT received: Shutting down gracefully...');
    await server.shutdown();
    process.exit(0); 
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received: Shutting down gracefully...');
    await server.shutdown();
    process.exit(0); 
});