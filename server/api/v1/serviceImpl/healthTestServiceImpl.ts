import { HealthTest } from "../../../models/test.model";
import { HealthTestType } from "../../../types/types";
import { HealthTestRepository } from "../repository/healthTest.repository";
import { HealthTestService } from "../services/healthTest.service";

export class HealthTestServiceImpl implements HealthTestService {
    private healthTestRepository: HealthTestRepository
    constructor(healthTestRepository: HealthTestRepository){
        this.healthTestRepository = healthTestRepository;
    }

    public async CreateHealthTests(body: HealthTestType): Promise<HealthTest> {
        try {
            return await this.healthTestRepository.createTest(body)
        } catch (error) {
            throw error
        }
    }

    public async GetHealthTests(): Promise<HealthTest[]> {
        return this.healthTestRepository.getAllTests()
    }
}