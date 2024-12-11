import { Appointment } from "../../../models/appointment.model"
import { AppointmentType } from "../../../types/types"

// defines contract that must be observed by the implementation class
export interface AppointmentService {
    BookAppointment: (body: AppointmentType) => Promise<Appointment>
    GetAppointments: () => Promise<Appointment[]>
    UpdateAppointment: () => Promise<Appointment>
}