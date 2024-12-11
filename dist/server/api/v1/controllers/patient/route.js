"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const patient_repository_1 = require("../../repository/patient.repository");
const patientServiceImpl_1 = require("../../serviceImpl/patientServiceImpl");
const patient_schema_1 = require("../../../../schema/patient.schema");
const validateInput_1 = require("../../../../middleware/validateInput");
const auth_1 = require("../../../../middleware/auth");
const patientRepository = new patient_repository_1.PatientRepository();
const patientServiceImpl = new patientServiceImpl_1.PatientServiceImpl(patientRepository);
const patientController = new controller_1.PatientController(patientServiceImpl);
// patient can register
// patient can login and receive an access token (jwt)
// patient can update information
// admin can view list of all patients
exports.default = express_1.default.Router()
    .post("/register", (0, validateInput_1.validateInput)(patient_schema_1.patientRegisterSchema), (req, res) => patientController.register(req, res))
    .post("/login", (0, validateInput_1.validateInput)(patient_schema_1.patientLoginSchema), (req, res) => patientController.login(req, res))
    .post("/update", auth_1.isAuth, (0, validateInput_1.validateInput)(patient_schema_1.patientUpdateSchema), (req, res) => patientController.update(req, res))
    .get("/get-patients", auth_1.isAdmin, (req, res) => patientController.getPatients(req, res));
