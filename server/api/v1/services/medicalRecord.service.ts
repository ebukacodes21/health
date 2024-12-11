
export interface MedicalRecordService {
    CreateMedicalRecord: (body: any) => Object
    GetMedicalRecord: (id: string, patientId: number) => Object
    GetMedicalRecords: () => Object
}