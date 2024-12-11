"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    databaseHost: process.env.POSTGRESQL_DATABASE_HOST,
    databasePort: process.env.POSTGRESQL_DATABASE_PORT,
    databaseName: process.env.POSTGRESQL_DATABASE_NAME,
    databaseUser: process.env.POSTGRESQL_DATABASE_USER,
    databasePassword: process.env.POSTGRESQL_DATABASE_PASSWORD,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    mongoUser: process.env.MONGO_INITDB_ROOT_USERNAME,
    mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
    mongoName: process.env.MONGO_INITDB_DATABASE,
    mongoPort: process.env.MONGO_DATABASE_PORT,
    mongoHost: process.env.MONGO_DATABASE_HOST,
    secret: process.env.SECRET,
};
