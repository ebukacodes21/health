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
exports.PatientRepository = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const patient_model_1 = require("../../../models/patient.model");
class PatientRepository {
    // create new patient
    registerPatient(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(body.password, salt);
            try {
                return patient_model_1.PatientModel.create({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    age: body.age,
                    password: hash,
                    phone: body.phone,
                    role: "admin"
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // find patient by email for login
    findPatientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_model_1.PatientModel.findOne({ where: { email } });
        });
    }
    // find patient by id (pk)
    findPatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_model_1.PatientModel.findByPk(id);
        });
    }
    //find all patients
    findPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_model_1.PatientModel.findAll({ where: { role: 'patient' } });
        });
    }
}
exports.PatientRepository = PatientRepository;
