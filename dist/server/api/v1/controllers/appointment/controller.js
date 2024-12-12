"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
class AppointmentController {
    constructor(appointmentServiceImpl) {
        this.appointmentServiceImpl = appointmentServiceImpl;
    }
    // book appointment
    book(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.appointmentServiceImpl.BookAppointment(body);
                const appointment = result.toJSON();
                res
                    .status(201)
                    .json({ message: "appointment booking successful", data: appointment });
            }
            catch (error) {
                console.log(error.message);
                if (error.message.includes("found")) {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(400).json({ error: error });
            }
        });
    }
    // get all appointments
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.appointmentServiceImpl.GetAppointments();
                const appointments = results.map((result) => {
                    return result.toJSON();
                });
                res
                    .status(200)
                    .json({ message: "appointments fetch successful", data: appointments });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    // update appointment
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const body = req.body;
            try {
                const result = yield this.appointmentServiceImpl.UpdateAppointment(Number(id), body);
                const appointment = result.toJSON();
                res.status(200).json({ message: "appointment update successful", data: { appointment } });
            }
            catch (error) {
                if (error.message.includes("not found")) {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(401).json({ error: error.message });
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
