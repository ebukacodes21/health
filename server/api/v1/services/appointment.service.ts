import { Appointment } from "../../../models/appointment.model"
import { AppointmentRequest, UpdateAppointmentType } from "../../../types/types"

// defines contract that must be observed by the implementation class
export interface AppointmentService {
    BookAppointment: (body: AppointmentRequest) => Promise<Appointment>
    GetAppointments: () => Promise<Appointment[]>
    UpdateAppointment: (id: number, body: UpdateAppointmentType) => Promise<Appointment>
}