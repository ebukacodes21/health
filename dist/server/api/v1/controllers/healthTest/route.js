"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateInput_1 = require("../../../../middleware/validateInput");
const auth_1 = require("../../../../middleware/auth");
const healthTest_schema_1 = require("../../../../schema/healthTest.schema");
const healthTest_repository_1 = require("../../repository/healthTest.repository");
const healthTestServiceImpl_1 = require("../../serviceImpl/healthTestServiceImpl");
const healthTestRepository = new healthTest_repository_1.HealthTestRepository();
const healthTestServiceImpl = new healthTestServiceImpl_1.HealthTestServiceImpl(healthTestRepository);
const healthTestController = new controller_1.HealthTestController(healthTestServiceImpl);
// only admin can create a health test
// patients can view/browse available health tests
exports.default = express_1.default.Router()
    .post("/create", auth_1.isAdmin, (0, validateInput_1.validateInput)(healthTest_schema_1.createHealthTestSchema), (req, res) => healthTestController.createTest(req, res))
    .get("/browse", auth_1.isAuth, (req, res) => healthTestController.getTests(req, res));
