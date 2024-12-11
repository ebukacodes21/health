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
exports.PatientServiceImpl = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PatientServiceImpl {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    // register patient service
    RegisterPatient(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.patientRepository.registerPatient(body);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // login patient service
    LoginPatient(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield this.patientRepository.findPatientByEmail(body.email);
                if (!patient) {
                    throw new Error("patient not found");
                }
                const validatePassword = yield bcrypt_1.default.compare(body.password, patient.password);
                if (!validatePassword) {
                    throw new Error("patient password is incorrect");
                }
                return patient;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // update patient service
    UpdatePatient(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield this.patientRepository.findPatient(id);
                if (!patient) {
                    throw new Error("patient not found");
                }
                patient.firstName = body.firstName;
                patient.lastName = body.lastName;
                patient.email = body.email;
                patient.phone = body.phone;
                patient.age = body.age;
                yield patient.save();
                return patient;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // all patients
    GetPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.patientRepository.findPatients();
        });
    }
}
exports.PatientServiceImpl = PatientServiceImpl;
