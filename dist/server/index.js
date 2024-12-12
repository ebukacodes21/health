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
const server_1 = __importDefault(require("./common/server"));
const route_1 = __importDefault(require("./route"));
const config_1 = __importDefault(require("config"));
const port = config_1.default.get("port");
// instantiate a new server here
const server = new server_1.default();
server.configureDb().then(() => {
    server.router(route_1.default);
    server.listen(port);
}).catch((error) => {
    console.log(error);
});
exports.default = server;
// Graceful Shutdown on signals
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGINT received: Shutting down gracefully...');
    yield server.shutdown();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGTERM received: Shutting down gracefully...');
    yield server.shutdown();
    process.exit(0);
}));
