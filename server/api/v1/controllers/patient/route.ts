import express from 'express'
import { PatientController } from './controller'
import { PatientRepository } from '../../repository/patient.repository'
import { PatientServiceImpl } from '../../serviceImpl/patientServiceImpl'
import { patientLoginSchema, patientRegisterSchema, patientUpdateSchema } from '../../../../schema/patient.schema'
import { validateInput } from '../../../../middleware/validateInput'
import { isAdmin, isAuth } from '../../../../middleware/auth'

const patientRepository = new PatientRepository()
const patientServiceImpl = new PatientServiceImpl(patientRepository)
const patientController = new PatientController(patientServiceImpl)

// patient can register
// patient can login and receive an access token (jwt)
// patient can update information
// admin can view list of all patients
export default express.Router()
    .post("/register", validateInput(patientRegisterSchema), (req, res) => patientController.register(req, res))
    .post("/login", validateInput(patientLoginSchema), (req, res) => patientController.login(req, res))
    .post("/update", isAuth, validateInput(patientUpdateSchema), (req, res) => patientController.update(req, res))
    .get("/get-patients", isAdmin, (req, res) => patientController.getPatients(req, res))
