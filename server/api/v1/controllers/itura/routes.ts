import express from 'express'
import { validateInput } from '../../../../middleware/validateInput'
import { ituraSchema } from '../../../../schema/itura.schema'
import { IturaController } from './controller'
import { IturaServiceImpl } from '../../serviceImpl/ituraServiceImpl'

const ituraServiceImpl = new IturaServiceImpl()
const ituraController = new IturaController(ituraServiceImpl)

export default express.Router()
    .post("/message", validateInput(ituraSchema), (req, res) => ituraController.reply(req, res))