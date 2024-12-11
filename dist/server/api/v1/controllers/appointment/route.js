"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateInput_1 = require("../../../../middleware/validateInput");
const auth_1 = require("../../../../middleware/auth");
const appointment_schema_1 = require("../../../../schema/appointment.schema");
const appointmentServiceImpl_1 = require("../../serviceImpl/appointmentServiceImpl");
const patient_repository_1 = require("../../repository/patient.repository");
const healthTest_repository_1 = require("../../repository/healthTest.repository");
const appointment_repository_1 = require("../../repository/appointment.repository");
const appointmentRepository = new appointment_repository_1.AppointmentRepository();
const patientRepository = new patient_repository_1.PatientRepository();
const healthTestRepository = new healthTest_repository_1.HealthTestRepository();
const appointmentServiceImpl = new appointmentServiceImpl_1.AppointmentServiceImpl(appointmentRepository, patientRepository, healthTestRepository);
const appointmentController = new controller_1.AppointmentController(appointmentServiceImpl);
// patients can book an appointment
// admin can update a patient appointment
// admin can fetch all appointments
exports.default = express_1.default.Router()
    .post("/book", auth_1.isAuth, (0, validateInput_1.validateInput)(appointment_schema_1.createAppointmentSchema), (req, res) => appointmentController.book(req, res))
    .post("/update", auth_1.isAdmin, (0, validateInput_1.validateInput)(appointment_schema_1.updateAppointmentSchema), (req, res) => appointmentController.update(req, res))
    .get("/all", auth_1.isAdmin, (req, res) => appointmentController.getAll(req, res));
