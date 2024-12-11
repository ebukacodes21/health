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
exports.PatientController = void 0;
const lodash_1 = require("lodash");
const patient_model_1 = require("../../../../models/patient.model");
const jwt_1 = require("../../../../utils/jwt");
class PatientController {
    constructor(patientServiceImpl) {
        this.patientServiceImpl = patientServiceImpl;
    }
    // register patient controller
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.patientServiceImpl.RegisterPatient(body);
                const patient = (0, lodash_1.omit)(result.toJSON(), patient_model_1.privateFields);
                res
                    .status(201)
                    .json({ message: "registration successful", data: patient });
            }
            catch (error) {
                console.log(error);
                if (error.errors[0].type === "unique violation") {
                    res
                        .status(500)
                        .json({ error: `${error.errors[0].path} already taken` });
                    return;
                }
                res.status(400).json({ error: error });
            }
        });
    }
    // login patient controller
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.patientServiceImpl.LoginPatient(body);
                const patient = (0, lodash_1.omit)(result.toJSON(), patient_model_1.privateFields);
                const accessToken = (0, jwt_1.signToken)(patient, { expiresIn: "15m" });
                res
                    .status(200)
                    .json({ message: "login successful", data: { accessToken, patient } });
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
    // update patient controller
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const body = req.body;
            try {
                const result = yield this.patientServiceImpl.UpdatePatient(Number(id), body);
                const patient = (0, lodash_1.omit)(result.toJSON(), patient_model_1.privateFields);
                res.status(200).json({ message: "update successful", data: { patient } });
            }
            catch (error) {
                if (error.errors[0].type === "unique violation") {
                    res
                        .status(500)
                        .json({ error: `${error.errors[0].path} already taken` });
                    return;
                }
                if (error.message.includes("not found")) {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(401).json({ error: error.message });
            }
        });
    }
    // get patients
    getPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.patientServiceImpl.GetPatients();
                const patients = results.map((result) => {
                    return (0, lodash_1.omit)(result.toJSON(), patient_model_1.privateFields);
                });
                res
                    .status(200)
                    .json({ message: "patients fetch successful", data: patients });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
}
exports.PatientController = PatientController;
