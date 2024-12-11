import { Consultation } from "../../../models/consult.model"
import { ConsultRequest } from "../../../types/types"

// defines contract that must be observed by the implementation class
export interface ConsultService {
    ConsultDoctor: (body: ConsultRequest) => Promise<Consultation>
    GetConsultations: () => Promise<Consultation[]>
}