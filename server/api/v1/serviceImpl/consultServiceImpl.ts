import { Consultation } from "../../../models/consult.model";
import {
  ConsultationRequest,
  UpdateConsultationType,
} from "../../../types/types";
import { ConsultationRepository } from "../repository/consult.repository";
import { PatientRepository } from "../repository/patient.repository";
import { ConsultService } from "../services/consult.service";

export class ConsultationServiceImpl implements ConsultService {
  private consultationRepository: ConsultationRepository;
  private patientRepository: PatientRepository;

  constructor(consultationRepository: ConsultationRepository, patientRepository: PatientRepository) {
    this.consultationRepository = consultationRepository;
    this.patientRepository = patientRepository
  }

  // create consultation
  public async ConsultDoctor(body: ConsultationRequest): Promise<Consultation> {
    try {
      const patientExists = this.patientRepository.findPatient(body.patientId)
      if(!patientExists){
        throw new Error("no patient found")
      }
      return await this.consultationRepository.createConsultation(body);
    } catch (error) {
      throw error;
    }
  }

  //   get consultations
  public async GetConsultations(): Promise<Consultation[]> {
    return this.consultationRepository.getConsultations();
  }

  //   update consultation
  public async UpdateConsultation(
    id: number,
    body: UpdateConsultationType
  ): Promise<Consultation> {
    try {
      const consultation = await this.consultationRepository.getConsultation(id, body.patientId);
      if (!consultation) {
        throw new Error("consultation not found");
      }

      consultation.status = body.status;
      await consultation.save();
      return consultation;
    } catch (error) {
      throw error;
    }
  }
}
