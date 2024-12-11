import { MedicalRecordType, UpdateMedicalRecordType } from "../../../types/types";
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
    public async CreateMedicalRecord(body: MedicalRecordType): Promise<MedicalRecordType> {
        try {
            const patientExists = await this.patientRepository.findPatient(body.patient.patientId)
            if(!patientExists){
              throw new Error("no patient found")
            }
            // use patient id to create patientId in mongodb
            return this.medicalRecordRepository.createMedicalRecord(body)
        } catch (error) {
            throw error
        }
    }

    // get a single record
    public async GetMedicalRecord(id: string, patientId: number): Promise<MedicalRecordType> {
        try {
            const record = await this.medicalRecordRepository.findRecord(id, patientId) as MedicalRecordType
            if(!record){
                throw new Error("no medical record found")
            }
            return record
        } catch (error) {
            throw error
        }
    }

    // get all records
    public async GetMedicalRecords() {
        return this.medicalRecordRepository.findAllRecords()
    }

    // update medical record
    public async UpdateMedicalRecord(id: string, patientId: number, body: UpdateMedicalRecordType ): Promise<MedicalRecordType> {
        try {
            const updatedRecord = await this.medicalRecordRepository.updateMedicalRecord(id, patientId, body);
            if (!updatedRecord) {
              throw new Error("no record found");
            }
            return updatedRecord;
          } catch (error) {
            throw error;
          }
    }
}