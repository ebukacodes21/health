"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthTestController = void 0;
class HealthTestController {
    constructor(healthTestServiceImpl) {
        this.healthTestServiceImpl = healthTestServiceImpl;
    }
    createTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.healthTestServiceImpl.CreateHealthTests(body);
                const test = result.toJSON();
                res
                    .status(201)
                    .json({ message: "health test created successfully", data: test });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    getTests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.healthTestServiceImpl.GetHealthTests();
                const tests = results.map((result) => {
                    return result.toJSON();
                });
                res
                    .status(200)
                    .json({ message: "health tests fetch successful", data: tests });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
}
exports.HealthTestController = HealthTestController;
