import { Request, Response } from "express";
import { ConsultationServiceImpl } from "../../serviceImpl/consultServiceImpl";
import { CreateConsultationInput, UpdateConsultationInput } from "../../../../schema/consult.schema";

export class ConsultationController {
    private consultationServiceImpl: ConsultationServiceImpl
    constructor(consultationServiceImpl: ConsultationServiceImpl) {
        this.consultationServiceImpl = consultationServiceImpl
    }

    public async consult(req: Request<{}, {}, CreateConsultationInput>, res: Response) {
        const body = req.body
        try {
            const result = await this.consultationServiceImpl.ConsultDoctor(body);
            const consultation = result.toJSON();
            res
              .status(201)
              .json({ message: "doctor consultation created successfully", data: consultation });
          } catch (error: any) {
            res.status(400).json({ error: error });
          }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const results = await this.consultationServiceImpl.GetConsultations();
            const consultations = results.map((result) => {
                return result.toJSON()
            });
            res
            .status(200)
            .json({ message: "doctor consultations fetch successful", data: consultations });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    public async update(req: Request<{}, UpdateConsultationInput['query'], UpdateConsultationInput['body']>, res: Response) {
        const { id } = req.query;
        const body = req.body;

        console.log(id, body)
        try {
          const result = await this.consultationServiceImpl.UpdateConsultation(Number(id), body);
          const consultation = result.toJSON();
          res.status(200).json({ message: "consultation update successful", data: { consultation } });
        } catch (error: any) {
          if (error.message.includes("not found")) {
            res.status(404).json({ error: error.message });
            return;
          }
    
          res.status(401).json({ error: error.message });
        }
    }
}