import { MedicalRecordRepository } from "../repository/medicalRecord.repository";
import { PatientRepository } from "../repository/patient.repository";
import { MedicalRecordService } from "../services/medicalRecord.service";

export class MedicalRecordServiceImpl implements MedicalRecordService {
    private medicalRecordRepository: MedicalRecordRepository
    private patientRepository: PatientRepository
    constructor(medicalRecordRepository: MedicalRecordRepository, patientRepository: PatientRepository) {
        this.medicalRecordRepository = medicalRecordRepository
        this.patientRepository = patientRepository
    }

    // create medical record
    public async CreateMedicalRecord(body: any) {

        try {
            const patientExists = this.patientRepository.findPatient(body.patientId)
            if(!patientExists){
              throw new Error("no patient found")
            }
            // use patient id to create patientId in mongodb
            await this.medicalRecordRepository.createMedicalRecord(body)
        } catch (error) {
            throw error
        }
    }

    // get a single record
    public async GetMedicalRecord(id: string, patientId: number) {
        try {
            return this.medicalRecordRepository.findRecord(id, patientId)
        } catch (error) {
            throw error
        }
    }

    // get all records
    public async GetMedicalRecords() {
        return this.medicalRecordRepository.findAllRecords()
    }
}