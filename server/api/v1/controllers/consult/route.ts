import express from 'express'
import { isAdmin, isAuth } from "../../../../middleware/auth";
import { validateInput } from '../../../../middleware/validateInput';
import { createConsultationSchema } from '../../../../schema/consult.schema';
import { ConsultationController } from './controller';
import { ConsultationServiceImpl } from '../../serviceImpl/consultServiceImpl';
import { PatientRepository } from '../../repository/patient.repository';
import { ConsultationRepository } from '../../repository/consult.repository';

const patientRepository = new PatientRepository()
const consultationRepository = new ConsultationRepository
const consultationServiceImpl = new ConsultationServiceImpl(consultationRepository, patientRepository)
const consultationController = new ConsultationController(consultationServiceImpl)

// patients can consult a doctor
// only admin can update a consultation
// only admin can view all consultations
export default express.Router()
    .post("/consult", isAuth, validateInput(createConsultationSchema), (req, res) => consultationController.consult(req, res))
    .get("/all", isAdmin, (req, res) => consultationController.getAll(req, res))
    .post("/update", isAdmin, (req, res) => consultationController.update(req, res))