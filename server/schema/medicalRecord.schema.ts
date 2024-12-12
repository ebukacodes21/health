import { z } from 'zod';

// prescription schema
const prescriptionSchema = z.object({
  medicationName: z.string().min(1, { message: "medication name is required" }),
  dosage: z.string().min(1, { message: "dosage is required" }),
  prescribedBy: z.string().min(1, { message: "prescriber is required" }),
  startDate: z.string(),
  endDate: z.string().optional(),
});

// result schema
const labResultSchema = z.object({
  testName: z.string().min(1, { message: "test name is required" }),
  result: z.string(),
  date: z.string(),
  notes: z.string(),
});

// medical history schema
const medicalHistorySchema = z.object({
  pastConditions: z.array(z.string()),
  surgeries: z.array(z.string()),
  allergies: z.array(z.string()),
  familyHistory: z.array(z.string()),
});

// patient schema (without _id)
const patientSchema = z.object({
  patientId: z.number().min(1, { message: "patient ID is required" }), 
});

// create medical record schema
export const createMedicalRecordSchema = z.object({
  body: z.object({
    patient: patientSchema, 
    medicalHistory: medicalHistorySchema,
    doctorReport: z.object({
      prescriptions: z.array(prescriptionSchema),
      labResults: z.array(labResultSchema),
    }),
    createdAt: z.string(), 
    updatedAt: z.string(), 
  }),
});

// get medical record schema
export const getMedicalRecordSchema = z.object({
  body: z.object({
    _id: z.string({
      required_error: "medical record ID is required",
    }),
    patientId: z.number({
      required_error: "patient ID is required",
    }).int(),
  }),
});

export const updateMedicalRecordSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "record ID is required "}),
    patientId: z.string({ required_error: "record ID is required "}),
  }),
  body: z.object({
    medicalHistory: z.object({
      pastConditions: z.array(z.string()),
      surgeries: z.array(z.string()),
      allergies: z.array(z.string()),
      familyHistory: z.array(z.string()),
    }),
    doctorReport: z.object({
      prescriptions: z.array(prescriptionSchema),
      labResults: z.array(labResultSchema),
    }),
    updatedAt: z.string(), 
  }),
});

export type CreateMedicalRecordInput = z.infer<typeof createMedicalRecordSchema>['body'];
export type GetMedicalRecordInput = z.infer<typeof getMedicalRecordSchema>['body'];
export type UpdateMedicalRecordInput = z.infer<typeof updateMedicalRecordSchema>;
