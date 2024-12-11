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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordServiceImpl = void 0;
class MedicalRecordServiceImpl {
    constructor(medicalRecordRepository, patientRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
    }
    // create medical record
    CreateMedicalRecord(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientExists = this.patientRepository.findPatient(body.patientId);
                if (!patientExists) {
                    throw new Error("no patient found");
                }
                // use patient id to create patientId in mongodb
                yield this.medicalRecordRepository.createMedicalRecord(body);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get a single record
    GetMedicalRecord(id, patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.medicalRecordRepository.findRecord(id, patientId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get all records
    GetMedicalRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.medicalRecordRepository.findAllRecords();
        });
    }
}
exports.MedicalRecordServiceImpl = MedicalRecordServiceImpl;
