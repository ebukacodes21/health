"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicalRecordSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        patientId: {
            type: Number,
            required: true,
        },
        required: true,
    },
    medicalHistory: {
        pastConditions: [String],
        surgeries: [String],
        allergies: [String],
        familyHistory: [String],
    },
    doctorReport: {
        prescriptions: [{
                medicationName: { type: String, required: true },
                dosage: { type: String, required: true },
                prescribedBy: { type: String },
                startDate: { type: Date, required: true },
                endDate: { type: Date },
            }],
        labResults: [{
                testName: { type: String, required: true },
                result: { type: String },
                date: { type: Date },
                notes: { type: String },
            }],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
medicalRecordSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.MedicalRecordModel = mongoose_1.default.model('MedicalRecord', medicalRecordSchema);
