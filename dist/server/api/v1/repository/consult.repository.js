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
exports.ConsultationRepository = void 0;
const consult_model_1 = require("../../../models/consult.model");
class ConsultationRepository {
    // create consultations
    createConsultation(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return consult_model_1.ConsultationModel.create({
                    patientId: body.patientId,
                    type: body.type,
                    appointmentDateTime: body.appointmentDateTime,
                    reason: body.reason,
                    doctorName: "Doctor 1",
                    consultationUrl: "www.link-to-health.com",
                    status: "pending"
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get all consultations
    getConsultations() {
        return __awaiter(this, void 0, void 0, function* () {
            return consult_model_1.ConsultationModel.findAll();
        });
    }
    // get a consultation
    getConsultation(id, patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return consult_model_1.ConsultationModel.findOne({ where: { id, patientId } });
        });
    }
}
exports.ConsultationRepository = ConsultationRepository;
