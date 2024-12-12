"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateInput_1 = require("../../../../middleware/validateInput");
const itura_schema_1 = require("../../../../schema/itura.schema");
const controller_1 = require("./controller");
const ituraServiceImpl_1 = require("../../serviceImpl/ituraServiceImpl");
const ituraServiceImpl = new ituraServiceImpl_1.IturaServiceImpl();
const ituraController = new controller_1.IturaController(ituraServiceImpl);
exports.default = express_1.default.Router()
    .post("/message", (0, validateInput_1.validateInput)(itura_schema_1.ituraSchema), (req, res) => ituraController.reply(req, res));
