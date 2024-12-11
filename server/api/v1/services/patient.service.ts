import { LoginRequest, PatientType, UpdateRequest } from "../../../types/types";
import { Patient } from "../../../models/patient.model";

// defines contract that must be observed by the service implementation class
export interface PatientService {
    RegisterPatient: (body: PatientType) => Promise<Patient>
    LoginPatient: (body: LoginRequest) => Promise<Patient>
    UpdatePatient: (id: number, body: UpdateRequest) => Promise<Patient>
    GetPatients: () => Promise<Patient[]>
}