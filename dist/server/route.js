"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./api/v1/controllers/patient/route"));
const route_2 = __importDefault(require("./api/v1/controllers/healthTest/route"));
const route_3 = __importDefault(require("./api/v1/controllers/appointment/route"));
const route_4 = __importDefault(require("./api/v1/controllers/consult/route"));
const routes_1 = __importDefault(require("./api/v1/controllers/itura/routes"));
const routes_2 = __importDefault(require("./api/v1/controllers/medicalRecord/routes"));
function routes(app) {
    app.use('/api/v1/patients', route_1.default);
    app.use('/api/v1/health-tests', route_2.default);
    app.use('/api/v1/appointments', route_3.default);
    app.use('/api/v1/consultations', route_4.default);
    app.use('/api/v1/itura', routes_1.default);
    app.use('/api/v1/medical-records', routes_2.default);
}
exports.default = routes;
