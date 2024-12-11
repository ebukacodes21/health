import { Request, Response } from "express";
import { MedicalRecordServiceImpl } from "../../serviceImpl/medicalRecordServiceImpl";
import { CreateMedicalRecordInput, GetMedicalRecordInput, UpdateMedicalRecordInput } from "../../../../schema/medicalRecord.schema";

export class MedicalRecordController {
  private medicalRecordServiceImpl: MedicalRecordServiceImpl;

  constructor(medicalRecordServiceImpl: MedicalRecordServiceImpl) {
    this.medicalRecordServiceImpl = medicalRecordServiceImpl;
  }

  public async createRecord(
    req: Request<{}, {}, CreateMedicalRecordInput>,
    res: Response
  ) {
    const { body } = req; 
    try {
      const record = await this.medicalRecordServiceImpl.CreateMedicalRecord(body);
      res.status(201).json({
        message: "Medical record created successfully",
        data: record,
      });
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  public async getRecord(req: Request<{}, {}, GetMedicalRecordInput>, res: Response) {
    const { _id, patientId } = req.body; 
    try {
      const record = await this.medicalRecordServiceImpl.GetMedicalRecord(_id, patientId);
      res.status(200).json({
        message: "Medical record fetched successfully",
        data: record,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  public async getRecords(req: Request, res: Response) {
    try {
      const results = await this.medicalRecordServiceImpl.GetMedicalRecords();
      const medicalRecords = results.map((result) => result.toJSON());
      res.status(200).json({
        message: "Medical records fetched successfully",
        data: medicalRecords,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  public async update(
    req: Request<{}, UpdateMedicalRecordInput['query'], UpdateMedicalRecordInput['body']>,
    res: Response
  ) {
    const { id, patientId } = req.query; 
    const { body } = req; 
    try {
      const result = await this.medicalRecordServiceImpl.UpdateMedicalRecord(
        id as string,
        Number(patientId),
        body
      );
      res.status(200).json({
        message: "Medical record updated successfully",
        data: { result },
      });
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  private handleError(error: any, res: Response) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}