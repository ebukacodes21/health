import { HealthTest } from "../../../models/test.model";
import { HealthTestType } from "../../../types/types";

// defines contract that must be observed by the implementation class
export interface HealthTestService {
    CreateHealthTests: (body: HealthTestType) => Promise<HealthTest>
    GetHealthTests: () => Promise<HealthTest[]>
}