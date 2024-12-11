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
exports.MedicalRecordRepository = void 0;
const medicalRecord_model_1 = require("../../../models/medicalRecord.model");
class MedicalRecordRepository {
    createMedicalRecord(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return medicalRecord_model_1.MedicalRecordModel.create(body);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAllRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            return medicalRecord_model_1.MedicalRecordModel.find();
        });
    }
    findRecord(id, patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicalRecord_model_1.MedicalRecordModel.findOne({ patient: {} });
        });
    }
}
exports.MedicalRecordRepository = MedicalRecordRepository;
