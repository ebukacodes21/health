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
exports.HealthTestRepository = void 0;
const test_model_1 = require("../../../models/test.model");
class HealthTestRepository {
    // create tests
    createTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return test_model_1.HealthTestModel.create({
                    type: body.type,
                    description: body.description,
                    facility: body.facility,
                    code: body.code
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // browse tests
    getAllTests() {
        return __awaiter(this, void 0, void 0, function* () {
            return test_model_1.HealthTestModel.findAll();
        });
    }
    // get test by id (pk)
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return test_model_1.HealthTestModel.findByPk(id);
        });
    }
}
exports.HealthTestRepository = HealthTestRepository;
