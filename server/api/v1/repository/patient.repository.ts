import bcrypt from 'bcrypt'
import { Patient, PatientModel } from '../../../models/patient.model'
import { PatientType } from '../../../types/types'

export class PatientRepository {
    // create new patient
    public async registerPatient(body: PatientType): Promise<Patient> {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(body.password, salt)

        try {
            return PatientModel.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                age: body.age,
                password: hash,
                phone: body.phone,
                role: "patient"
            })
        } catch (error) {
            throw error
          
        }
        
    }

    // find patient by email for login
    public async findPatientByEmail(email: string) {
        return PatientModel.findOne({ where: { email }})
    }

    // find patient by id (pk)
    public async findPatient(id: number) {
        return PatientModel.findByPk(id)
    }

    //find all patients
    public async findPatients() {
        return PatientModel.findAll({ where: { role: 'patient' }})
    }
}