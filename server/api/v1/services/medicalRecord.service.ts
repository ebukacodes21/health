import { MedicalRecordType } from "../../../types/types"

// contract must be observed by implementation class
export interface MedicalRecordService {
    CreateMedicalRecord: (body: MedicalRecordType) => Promise<MedicalRecordType>
    GetMedicalRecord: (id: string, patientId: number) => Promise<MedicalRecordType>
    GetMedicalRecords: () => Promise<MedicalRecordType[]>
    UpdateMedicalRecord(id: string, patientId: number, body: MedicalRecordType ): Promise<MedicalRecordType>
}