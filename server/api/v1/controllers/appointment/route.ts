import express from 'express'
import { AppointmentController  } from './controller'
import { validateInput } from '../../../../middleware/validateInput'
import { isAdmin, isAuth } from '../../../../middleware/auth'
import { createAppointmentSchema, updateAppointmentSchema } from '../../../../schema/appointment.schema'
import { AppointmentServiceImpl } from '../../serviceImpl/appointmentServiceImpl'
import { PatientRepository } from '../../repository/patient.repository'
import { HealthTestRepository } from '../../repository/healthTest.repository'
import { AppointmentRepository } from '../../repository/appointment.repository'

const appointmentRepository = new AppointmentRepository()
const patientRepository = new PatientRepository()
const healthTestRepository = new HealthTestRepository()
const appointmentServiceImpl = new AppointmentServiceImpl(appointmentRepository,patientRepository, healthTestRepository)
const appointmentController = new AppointmentController(appointmentServiceImpl)

// patients can book an appointment
// admin can update a patient appointment
// admin can fetch all appointments
export default express.Router()
    .post("/book", isAuth, validateInput(createAppointmentSchema), (req, res) => appointmentController.book(req, res))
    .post("/update", isAdmin, validateInput(updateAppointmentSchema), (req, res) => appointmentController.update(req, res))
    .get("/all", isAdmin, (req, res) => appointmentController.getAll(req, res))