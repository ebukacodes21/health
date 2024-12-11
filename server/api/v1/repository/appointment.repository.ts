import { Appointment, AppointmentModel } from "../../../models/appointment.model"
import { AppointmentRequest, AppointmentType } from "../../../types/types"

export class AppointmentRepository {
    // create appointment
    public async createAppointment(body: AppointmentRequest): Promise<Appointment> {
        try {
            return AppointmentModel.create({
                patientId: body.patientId,
                testId: body.testId,
                appointmentDateTime: body.appointmentDateTime,
                doctorName: body.doctorName,
                status: "booked"
            })
        } catch (error) {
            throw error
        }
    }

    // get all appointment
    public async getAllAppointments() {
        return AppointmentModel.findAll()
    }

    // find an appointment by id (pk), patientId, testId
    public async findAppointment(id: number, patientId: number, testId: number) {
        return AppointmentModel.findOne({ where: { id, patientId, testId }})
    }
}