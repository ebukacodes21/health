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
exports.patientLoginSchema = exports.patientUpdateSchema = exports.patientRegisterSchema = void 0;
const z = __importStar(require("zod"));
exports.patientRegisterSchema = z.object({
    body: z.object({
        firstName: z.string({
            required_error: "first name is required"
        }),
        lastName: z.string({
            required_error: "last name is required"
        }),
        email: z.string({
            required_error: "email is required"
        }).email("must be a valid email address"),
        phone: z.string({
            required_error: "phone number is required"
        }).min(11, "must be atleast 11 digits"),
        age: z.number({
            required_error: "age is required"
        }),
        password: z.string({
            required_error: "password is required"
        }),
    })
});
exports.patientUpdateSchema = z.object({
    query: z.object({
        id: z.string().regex(/^\d+$/, "patient id must be a number").transform(Number),
    }),
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email("must be a valid email address"),
        phone: z.string().min(11, "must be atleast 11 digits"),
        age: z.number(),
    })
});
exports.patientLoginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "email is required"
        }).email("must be a valid email address"),
        password: z.string({
            required_error: "password is required"
        }),
    })
});
