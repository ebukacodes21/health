import { MedicalRecordModel } from "../../../models/medicalRecord.model";
import { MedicalRecordType } from "../../../types/types";
import mongoose from 'mongoose';

export class MedicalRecordRepository {
  // create record
  public async createMedicalRecord(body: MedicalRecordType) {
    try {
      return await MedicalRecordModel.create({
        patient: {
          patientId: body.patient.patientId,
        },
        medicalHistory: {
          pastConditions: body.medicalHistory.pastConditions,
          surgeries: body.medicalHistory.surgeries,
          allergies: body.medicalHistory.allergies,
          familyHistory: body.medicalHistory.familyHistory,
        },
        doctorReport: {
          prescriptions: body.doctorReport.prescriptions.map(
            (prescription) => ({
              medicationName: prescription.medicationName,
              dosage: prescription.dosage,
              prescribedBy: prescription.prescribedBy,
              startDate: prescription.startDate,
              endDate: prescription.endDate,
            })
          ),
          labResults: body.doctorReport.labResults.map((labResult) => ({
            testName: labResult.testName,
            result: labResult.result,
            date: labResult.date,
            notes: labResult.notes,
          })),
        },
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      });
    } catch (error) {
      throw error;
    }
  }

  // get all medical records
  public async findAllRecords() {
    return MedicalRecordModel.find();
  }

  // get a single record
  public async findRecord(_id: string, patientId: number) {
    const objectId = new mongoose.Types.ObjectId(_id);
    return MedicalRecordModel.findOne({ _id: objectId, patient: { patientId }})
  }

  // update medical record
  public async updateMedicalRecord(id: string, patientId: number, updateData: Partial<MedicalRecordType>) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      return await MedicalRecordModel.findOneAndUpdate(
        { _id: objectId, "patient.patientId": patientId },
        {
          $set: updateData,
          updatedAt: new Date(), 
        },
        { new: true } 
      );
    } catch (error: any) {
      throw error;
    }
  }
}
