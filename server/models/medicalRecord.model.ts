import mongoose, { Schema, model, Document } from 'mongoose';
import { MedicalRecordType } from '../types/types';

const medicalRecordSchema = new Schema({
  patient: {
    // _id: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    patientId: { type: Number, required: true }, 
  },
  medicalHistory: {
    pastConditions: { type: [String], default: [] },
    surgeries: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    familyHistory: { type: [String], default: [] },
  },
  doctorReport: {
    prescriptions: [{
      medicationName: { type: String, required: true },
      dosage: { type: String, required: true },
      prescribedBy: { type: String },
      startDate: { type: String, required: true },
      endDate: { type: String },
    }],
    labResults: [{
      testName: { type: String, required: true },
      result: { type: String },
      date: { type: String },
      notes: { type: String },
    }],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MedicalRecordModel = model<Document & MedicalRecordType>('MedicalRecord', medicalRecordSchema);

export { MedicalRecordModel };
