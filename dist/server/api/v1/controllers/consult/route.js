"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
const validateInput_1 = require("../../../../middleware/validateInput");
const consult_schema_1 = require("../../../../schema/consult.schema");
const controller_1 = require("./controller");
const consultServiceImpl_1 = require("../../serviceImpl/consultServiceImpl");
const patient_repository_1 = require("../../repository/patient.repository");
const consult_repository_1 = require("../../repository/consult.repository");
const patientRepository = new patient_repository_1.PatientRepository();
const consultationRepository = new consult_repository_1.ConsultationRepository;
const consultationServiceImpl = new consultServiceImpl_1.ConsultationServiceImpl(consultationRepository, patientRepository);
const consultationController = new controller_1.ConsultationController(consultationServiceImpl);
// patients can consult a doctor
// only admin can update a consultation
// only admin can view all consultations
exports.default = express_1.default.Router()
    .post("/consult", auth_1.isAuth, (0, validateInput_1.validateInput)(consult_schema_1.createConsultationSchema), (req, res) => consultationController.consult(req, res))
    .get("/all", auth_1.isAdmin, (req, res) => consultationController.getAll(req, res))
    .post("/update", auth_1.isAdmin, (req, res) => consultationController.update(req, res));
