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
exports.connectMongo = exports.sequelize = void 0;
const core_1 = require("@sequelize/core");
const postgres_1 = require("@sequelize/postgres");
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
// postgresql auth
const databaseName = config_1.default.get("databaseName");
const databaseUser = config_1.default.get("databaseUser");
const databasePassword = config_1.default.get("databasePassword");
const host = config_1.default.get("databaseHost");
const port = config_1.default.get("databasePort");
// mongo
const mongoUser = config_1.default.get("mongoUser");
const mongoPassword = config_1.default.get("mongoPassword");
const mongoName = config_1.default.get("mongoName");
const mongoHost = config_1.default.get("mongoHost");
const mongoPort = config_1.default.get("mongoPort");
exports.sequelize = new core_1.Sequelize({
    dialect: postgres_1.PostgresDialect,
    database: databaseName,
    user: databaseUser,
    password: databasePassword,
    host,
    port,
    ssl: false,
    clientMinMessages: 'notice',
});
const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoName}?authSource=admin`;
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
});
exports.connectMongo = connectMongo;
