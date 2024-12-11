import { Request, Response } from "express";
import { MedicalRecordServiceImpl } from "../../serviceImpl/medicalRecordServiceImpl";

export class MedicalRecordController {
    private medicalRecordServiceImpl: MedicalRecordServiceImpl
    constructor(medicalRecordServiceImpl: MedicalRecordServiceImpl){
        this.medicalRecordServiceImpl = medicalRecordServiceImpl
    }

    public async createRecord(req: Request, res: Response) {

    }

    public async getRecord(req: Request, res: Response) {
        
    }

    public async getRecords(req: Request, res: Response) {
        
    }

    public async update(req: Request, res: Response) {
        
    }
}