import express from 'express'
import { isAdmin, isAuth } from '../../../../middleware/auth'
import { MedicalRecordController } from './controller'
import { MedicalRecordServiceImpl } from '../../serviceImpl/medicalRecordServiceImpl'
import { MedicalRecordRepository } from '../../repository/medicalRecord.repository'
import { PatientRepository } from '../../repository/patient.repository'

const patientRepository = new PatientRepository()
const medicalRecordRepository = new MedicalRecordRepository()
const medicalRecordServiceImpl = new MedicalRecordServiceImpl(medicalRecordRepository, patientRepository)
const medicalRecordController = new MedicalRecordController(medicalRecordServiceImpl)

// only admin can create, update and get all medical records
// patient can only get own medical record
export default express.Router()
    .post("/create", isAdmin, (req, res) => medicalRecordController.createRecord(req, res))
    .get("/get-record", isAuth, (req, res) => medicalRecordController.getRecord(req, res))
    .get("/get-records", isAdmin, (req, res) => medicalRecordController.getRecords(req, res))
    .post("/update", isAdmin, (req, res) => medicalRecordController.update(req, res))