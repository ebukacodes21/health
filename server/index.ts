import HealthServer from "./common/server";
import routes from "./route";
import config from 'config'

const port = config.get<number>("port")
// instantiate a new server here
const server = new HealthServer()
server.configureDb().then(() => { 
    server.router(routes)
    server.listen(port)
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