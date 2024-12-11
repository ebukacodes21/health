import { Request, Response } from "express";
import { HealthTestServiceImpl } from "../../serviceImpl/healthTestServiceImpl";
import { CreateHealthTestInput } from "../../../../schema/healthTest.schema";

export class HealthTestController {
    private healthTestServiceImpl: HealthTestServiceImpl
    constructor(healthTestServiceImpl: HealthTestServiceImpl){
        this.healthTestServiceImpl = healthTestServiceImpl
    }

    public async createTest(req: Request<{}, {}, CreateHealthTestInput>, res: Response) {
        const body = req.body
        try {
            const result = await this.healthTestServiceImpl.CreateHealthTests(body);
            const test = result.toJSON();
            res
              .status(201)
              .json({ message: "health test created successfully", data: test });
          } catch (error: any) {
            if (error.errors[0].type === "unique violation") {
              res
                .status(500)
                .json({ error: `${error.errors[0].path} already taken` });
              return;
            }
            res.status(400).json({ error: error });
          }
    }

    public async getTests(req: Request, res: Response) {
        try {
            const results = await this.healthTestServiceImpl.GetHealthTests();
            const tests = results.map((result) => {
                return result.toJSON()
            });
            res
            .status(200)
            .json({ message: "health tests fetch successful", data: tests });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}