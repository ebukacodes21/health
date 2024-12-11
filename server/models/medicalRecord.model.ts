import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
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

export const MedicalRecordModel = mongoose.model('MedicalRecord', medicalRecordSchema);
