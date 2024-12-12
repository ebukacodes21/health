import { Consultation, ConsultationModel } from "../../../models/consult.model"
import { ConsultationRequest, ConsultationType } from "../../../types/types"

export class ConsultationRepository {
    // create consultations
    public async createConsultation(body: ConsultationRequest): Promise<Consultation> {
        try {
            return ConsultationModel.create({
                patientId: body.patientId,
                type: body.type,
                appointmentDateTime: body.appointmentDateTime,
                reason: body.reason,
                doctorName: "Doctor 1",
                consultationUrl: "www.link-to-health.com",
                status: "pending"
            })
        } catch (error) {
            throw error
        }
    }

    // get all consultations
    public async getConsultations() {
        return ConsultationModel.findAll()
    }

    // get a consultation
    public async getConsultation(id: number, patientId: number) {
        return ConsultationModel.findOne({ where: { id, patientId }})
    }
}