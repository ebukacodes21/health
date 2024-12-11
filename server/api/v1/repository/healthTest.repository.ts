import { HealthTest, HealthTestModel } from "../../../models/test.model"
import { HealthTestType } from "../../../types/types"

export class HealthTestRepository {
    // create tests
    public async createTest(body: HealthTestType): Promise<HealthTest> {
        try {
            return HealthTestModel.create({
                type: body.type,
                description: body.description,
                facility: body.facility,
                code: body.code!
            })
        } catch (error) {
            throw error
        }
    }

    // browse tests
    public async getAllTests() {
        return HealthTestModel.findAll()
    }

    // get test by id (pk)
    public async getTest(id: number) {
        return HealthTestModel.findByPk(id)
    }
}