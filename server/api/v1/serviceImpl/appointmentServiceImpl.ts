import { Appointment } from "../../../models/appointment.model";
import { AppointmentRequest, AppointmentType, UpdateAppointmentType } from "../../../types/types";
import { AppointmentRepository } from "../repository/appointment.repository";
import { HealthTestRepository } from "../repository/healthTest.repository";
import { PatientRepository } from "../repository/patient.repository";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentServiceImpl implements AppointmentService{
    private appointmentRepository: AppointmentRepository
    private patientRepository: PatientRepository
    private healthTestRepository: HealthTestRepository

    constructor(appointmentRepository: AppointmentRepository, patientRepository: PatientRepository, healthTestRepository: HealthTestRepository){
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository
        this.healthTestRepository = healthTestRepository
    }

    public async BookAppointment (body: AppointmentRequest): Promise<Appointment> {
        try {
            const patientExists = this.patientRepository.findPatient(body.patientId)
            const testExists = this.healthTestRepository.getTest(body.testId)
            
            const [patientResult, testResult] = await Promise.all([patientExists, testExists])
            if (!patientResult){
                throw new Error("no patient found")
            } else if (!testResult){
                throw new Error("no health test found")
            }

            return await this.appointmentRepository.createAppointment(body)
        } catch (error) {
            throw error
        }
    }

    public async GetAppointments (): Promise<Appointment[]> {
        return this.appointmentRepository.getAllAppointments()
    }
    
    public async UpdateAppointment (id: number, body: UpdateAppointmentType): Promise<Appointment> {
        try {
            const appointment = await this.appointmentRepository.findAppointment(id, body.testId, body.patientId)
            if (!appointment){
                throw new Error("appointment not found")
            }

            appointment.status = body.status
            await appointment.save()
            return appointment
        } catch (error) {
            throw error
        }
    }
}