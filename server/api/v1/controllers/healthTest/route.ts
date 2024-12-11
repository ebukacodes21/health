import express from 'express'
import { HealthTestController  } from './controller'
import { validateInput } from '../../../../middleware/validateInput'
import { isAdmin, isAuth } from '../../../../middleware/auth'
import { createHealthTestSchema } from '../../../../schema/healthTest.schema'
import { HealthTestRepository } from '../../repository/healthTest.repository'
import { HealthTestServiceImpl } from '../../serviceImpl/healthTestServiceImpl'

const healthTestRepository = new HealthTestRepository()
const healthTestServiceImpl = new HealthTestServiceImpl(healthTestRepository)
const healthTestController = new HealthTestController(healthTestServiceImpl)

export default express.Router()
    .post("/create", isAdmin, validateInput(createHealthTestSchema), (req, res) => healthTestController.createTest(req, res))
    .get("/browse", isAuth, (req, res) => healthTestController.getTests(req, res))