"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConsultationSchema = exports.createConsultationSchema = void 0;
const z = __importStar(require("zod"));
exports.createConsultationSchema = z.object({
    body: z.object({
        patientId: z.number({
            required_error: "Patient ID is required",
        }).int(),
        type: z.string({
            required_error: "consultation type is required",
        }),
        appointmentDateTime: z.string({
            required_error: "Appointment date and time are required",
        }),
        reason: z.string({
            required_error: "reason for appointment required",
        }),
    }),
});
exports.updateConsultationSchema = z.object({
    query: z.object({
        id: z.string().regex(/^\d+$/, "consultation ID must be a number").transform(Number),
    }),
    body: z.object({
        patientId: z.number({
            required_error: "Patient ID is required",
        }).int(),
        status: z.enum(["pending", "rejected", "confirmed", "completed"], {
            required_error: "Appointment status is required",
        }),
    }),
});
