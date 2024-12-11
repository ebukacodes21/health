import http from 'http'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { connectMongo, sequelize } from '../database/database.config'
import mongoose from 'mongoose'

const app = express()
const server = new http.Server(app)

/**
 * this is the blueprint for the Health server. 
 * use it to instantiate a new server. 
 */ 
class HealthServer {
    constructor(){
        app.use(express.json())
        app.use(express.urlencoded({ extended: true}))
        app.use(morgan("dev"))
        app.use(helmet.contentSecurityPolicy({ reportOnly: true}))
        app.use(cors({
            allowedHeaders: ["Content-Type", "token", "authorization"],
            exposedHeaders: ["token", "authorization"],
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
        }))
    }

    router(routes: any) {
        routes(app)
        return this
    }

    async configureDb() {
        try {
            await connectMongo();
            await sequelize.sync({ force: false });
            console.log('Connected to MongoDB & PostgreSQL database');

            return this;  
        } catch (error) {
            console.error('Error configuring databases:', error);
            throw error;  
        }
    }

    listen(port: number) {
        server.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
        return app;
    }

    shutdown() {
        server.close(() => {
            console.log("Server has been shut down gracefully.");
            sequelize.close();
            mongoose.connection.close();
        });

}
}

export default HealthServer;