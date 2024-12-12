import { Consultation } from "../../../models/consult.model"
import { ConsultationRequest, UpdateConsultationType } from "../../../types/types"

// defines contract that must be observed by the implementation class
export interface ConsultService {
    ConsultDoctor: (body: ConsultationRequest) => Promise<Consultation>
    GetConsultations: () => Promise<Consultation[]>
    UpdateConsultation: (id: number, body: UpdateConsultationType) => Promise<Consultation>
}