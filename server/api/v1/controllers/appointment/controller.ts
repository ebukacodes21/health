import { Request, Response } from "express";
import { AppointmentServiceImpl } from "../../serviceImpl/appointmentServiceImpl";
import { CreateAppointmentInput, UpdateAppointmentInput } from "../../../../schema/appointment.schema";

export class AppointmentController {
    private appointmentServiceImpl: AppointmentServiceImpl
    constructor(appointmentServiceImpl: AppointmentServiceImpl) {
        this.appointmentServiceImpl = appointmentServiceImpl
    }   

    // book appointment
    public async book(req: Request<{}, {}, CreateAppointmentInput>, res: Response) {
        const body = req.body;

        try {
            const result = await this.appointmentServiceImpl.BookAppointment(body);
            const appointment = result.toJSON();
            res
              .status(201)
              .json({ message: "appointment booking successful", data: appointment });
          } catch (error: any) {
            console.log(error.message)
            if (error.message.includes("found")) {
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error });
          }
    }

    // get all appointments
    public async getAll(req: Request, res: Response) {
        try {
            const results = await this.appointmentServiceImpl.GetAppointments();
            const appointments = results.map((result) => {
              return result.toJSON();
            });
            res
              .status(200)
              .json({ message: "appointments fetch successful", data: appointments });
          } catch (error) {
            res.status(400).json({ error: error });
          }
    }

    // update appointment
    public async update(req: Request<{}, UpdateAppointmentInput["query"], UpdateAppointmentInput["body"]>,
        res: Response
      ) {
        const { id } = req.query;
        const body = req.body;
        try {
          const result = await this.appointmentServiceImpl.UpdateAppointment(Number(id), body);
          const appointment = result.toJSON();
          res.status(200).json({ message: "appointment update successful", data: { appointment } });
        } catch (error: any) {
          if (error.message.includes("not found")) {
            res.status(404).json({ error: error.message });
            return;
          }
    
          res.status(401).json({ error: error.message });
        }
    }
}