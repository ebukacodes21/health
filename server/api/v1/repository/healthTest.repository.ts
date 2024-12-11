import { HealthTest, HealthTestModel } from "../../../models/test.model"
import { HealthTestType } from "../../../types/types"

export class HealthTestRepository {
    public async createTest(body: HealthTestType): Promise<HealthTest> {

        try {
            return HealthTestModel.create({
                type: body.type,
                description: body.description,
                code: body.code,
                facility: body.facility,
            })
        } catch (error) {
            throw error
        }
    }

    public async getAllTests() {
        return HealthTestModel.findAll()
    }
}