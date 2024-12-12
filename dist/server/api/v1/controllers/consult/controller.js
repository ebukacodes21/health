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
exports.ConsultationController = void 0;
class ConsultationController {
    constructor(consultationServiceImpl) {
        this.consultationServiceImpl = consultationServiceImpl;
    }
    consult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.consultationServiceImpl.ConsultDoctor(body);
                const consultation = result.toJSON();
                res
                    .status(201)
                    .json({ message: "doctor consultation created successfully", data: consultation });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.consultationServiceImpl.GetConsultations();
                const consultations = results.map((result) => {
                    return result.toJSON();
                });
                res
                    .status(200)
                    .json({ message: "doctor consultations fetch successful", data: consultations });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const body = req.body;
            console.log(id, body);
            try {
                const result = yield this.consultationServiceImpl.UpdateConsultation(Number(id), body);
                const consultation = result.toJSON();
                res.status(200).json({ message: "consultation update successful", data: { consultation } });
            }
            catch (error) {
                if (error.message.includes("not found")) {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(401).json({ error: error.message });
            }
        });
    }
}
exports.ConsultationController = ConsultationController;
