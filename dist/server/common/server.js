"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("../database/database.config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
/**
 * this is the blueprint for the Health server.
 * use it to instantiate a new server.
 */
class HealthServer {
    constructor() {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, morgan_1.default)("dev"));
        app.use(helmet_1.default.contentSecurityPolicy({ reportOnly: true }));
        app.use((0, cors_1.default)({
            allowedHeaders: ["Content-Type", "token", "authorization"],
            exposedHeaders: ["token", "authorization"],
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
        }));
    }
    router(routes) {
        routes(app);
        return this;
    }
    configureDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_config_1.connectMongo)();
                yield database_config_1.sequelize.sync({ force: false });
                console.log('Connected to MongoDB & PostgreSQL database');
                return this;
            }
            catch (error) {
                console.error('Error configuring databases:', error);
                throw error;
            }
        });
    }
    listen(port) {
        server.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
        return app;
    }
    shutdown() {
        server.close(() => {
            console.log("Server has been shut down gracefully.");
            database_config_1.sequelize.close();
            mongoose_1.default.connection.close();
        });
    }
}
exports.default = HealthServer;
