import { MedicalRecordModel } from "../../../models/medicalRecord.model"

export class MedicalRecordRepository {
    public async createMedicalRecord(body: any) {
        try {
            return MedicalRecordModel.create(body)
        } catch (error) {
            throw error
        }
    }

    public async findAllRecords() {
        return MedicalRecordModel.find()
    }

    public async findRecord(id: string, patientId: number) {
        return MedicalRecordModel.findOne({ patient: { }})
    }
}