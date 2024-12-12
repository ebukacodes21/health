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
exports.ConsultationServiceImpl = void 0;
class ConsultationServiceImpl {
    constructor(consultationRepository, patientRepository) {
        this.consultationRepository = consultationRepository;
        this.patientRepository = patientRepository;
    }
    // create consultation
    ConsultDoctor(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientExists = this.patientRepository.findPatient(body.patientId);
                if (!patientExists) {
                    throw new Error("no patient found");
                }
                return yield this.consultationRepository.createConsultation(body);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   get consultations
    GetConsultations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.consultationRepository.getConsultations();
        });
    }
    //   update consultation
    UpdateConsultation(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consultation = yield this.consultationRepository.getConsultation(id, body.patientId);
                if (!consultation) {
                    throw new Error("consultation not found");
                }
                consultation.status = body.status;
                yield consultation.save();
                return consultation;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ConsultationServiceImpl = ConsultationServiceImpl;
