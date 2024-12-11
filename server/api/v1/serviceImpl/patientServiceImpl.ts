import { PatientService } from "../services/patient.service"; 
import { PatientRepository } from "../repository/patient.repository"; 
import { Patient } from "../../../models/patient.model";
import { LoginRequest, PatientType, UpdateRequest } from "../../../types/types";
import bcrypt from 'bcrypt'

export class PatientServiceImpl implements PatientService {
    private patientRepository: PatientRepository;
    constructor(patientRepository: PatientRepository) {
        this.patientRepository = patientRepository;
    }

    // register patient service
    public async RegisterPatient(body: PatientType): Promise<Patient> {
        try {
            return await this.patientRepository.registerPatient(body)
        } catch (error) {
            throw error
        }
    }

    // login patient service
    public async LoginPatient(body: LoginRequest): Promise<Patient> {
        try {
            const patient = await this.patientRepository.findPatientByEmail(body.email)
            if (!patient){
                throw new Error("patient not found")
            }
            const validatePassword = await bcrypt.compare(body.password, patient.password)
            if (!validatePassword){
                throw new Error("patient password is incorrect")
            }

            return patient
        } catch (error) {
            throw error
        }
    }

    // update patient service
    public async UpdatePatient(id: number, body: UpdateRequest): Promise<Patient> {
        try {
            const patient = await this.patientRepository.findPatient(id)
            if (!patient){
                throw new Error("patient not found")
            }

            patient.firstName = body.firstName
            patient.lastName = body.lastName
            patient.email = body.email
            patient.phone = body.phone
            patient.age = body.age
            await patient.save()

            return patient
        } catch (error) {
            throw error
        }
    }

    // all patients
    public async GetPatients(): Promise<Patient[]> {
        return this.patientRepository.findPatients()
    }
}
