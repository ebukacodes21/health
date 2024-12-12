"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
const controller_1 = require("./controller");
const medicalRecordServiceImpl_1 = require("../../serviceImpl/medicalRecordServiceImpl");
const medicalRecord_repository_1 = require("../../repository/medicalRecord.repository");
const patient_repository_1 = require("../../repository/patient.repository");
const patientRepository = new patient_repository_1.PatientRepository();
const medicalRecordRepository = new medicalRecord_repository_1.MedicalRecordRepository();
const medicalRecordServiceImpl = new medicalRecordServiceImpl_1.MedicalRecordServiceImpl(medicalRecordRepository, patientRepository);
const medicalRecordController = new controller_1.MedicalRecordController(medicalRecordServiceImpl);
// only admin can create, update and get all medical records
// patient can only get own medical record
exports.default = express_1.default.Router()
    .post("/create", auth_1.isAdmin, (req, res) => medicalRecordController.createRecord(req, res))
    .get("/get-record", auth_1.isAuth, (req, res) => medicalRecordController.getRecord(req, res))
    .get("/get-records", auth_1.isAdmin, (req, res) => medicalRecordController.getRecords(req, res))
    .post("/update", auth_1.isAdmin, (req, res) => medicalRecordController.update(req, res));
