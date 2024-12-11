import { Response, Request } from "express";
import { PatientServiceImpl } from "../../serviceImpl/patientServiceImpl";
import {
  PatientLoginInput,
  PatientRegisterInput,
  PatientUpdateInput,
} from "../../../../schema/patient.schema";
import { omit } from "lodash";
import { privateFields } from "../../../../models/patient.model";
import { PatientType } from "../../../../types/types";
import { signToken } from "../../../../utils/jwt";

export class PatientController {
  private patientServiceImpl: PatientServiceImpl;
  constructor(patientServiceImpl: PatientServiceImpl) {
    this.patientServiceImpl = patientServiceImpl;
  }

  // register patient controller
  public async register(
    req: Request<{}, {}, PatientRegisterInput>,
    res: Response
  ) {
    const body = req.body;

    try {
      const result = await this.patientServiceImpl.RegisterPatient(body);
      const patient = omit(result.toJSON(), privateFields);
      res
        .status(201)
        .json({ message: "registration successful", data: patient });
    } catch (error: any) {
      console.log(error)
      if (error.errors[0].type === "unique violation") {
        res
          .status(500)
          .json({ error: `${error.errors[0].path} already taken` });
        return;
      }
      res.status(400).json({ error: error });
    }
  }

  // login patient controller
  public async login(req: Request<{}, {}, PatientLoginInput>, res: Response) {
    const body = req.body;

    try {
      const result = await this.patientServiceImpl.LoginPatient(body);
      const patient = omit(result.toJSON(), privateFields) as PatientType;
      const accessToken = signToken(patient, { expiresIn: "15m" });

      res
        .status(200)
        .json({ message: "login successful", data: { accessToken, patient } });
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(401).json({ error: error.message });
    }
  }

  // update patient controller
  public async update(
    req: Request<{}, PatientUpdateInput["query"], PatientUpdateInput["body"]>,
    res: Response
  ) {
    const { id } = req.query;
    const body = req.body;

    try {
      const result = await this.patientServiceImpl.UpdatePatient(Number(id), body);
      const patient = omit(result.toJSON(), privateFields) as PatientType;
      res.status(200).json({ message: "update successful", data: { patient } });
    } catch (error: any) {
      if (error.errors[0].type === "unique violation") {
        res
          .status(500)
          .json({ error: `${error.errors[0].path} already taken` });
        return;
      }
      if (error.message.includes("not found")) {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(401).json({ error: error.message });
    }
  }

  // get patients
  public async getPatients(req: Request, res: Response) {
    try {
        const results = await this.patientServiceImpl.GetPatients();
        const patients = results.map((result) => {
            return omit(result.toJSON(), privateFields)
        });
        res
        .status(200)
        .json({ message: "patients fetch successful", data: patients });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
}
