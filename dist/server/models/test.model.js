"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthTestModel = exports.HealthTest = void 0;
const core_1 = require("@sequelize/core");
const database_config_1 = require("../database/database.config");
const uuid_1 = require("uuid");
class HealthTest extends core_1.Model {
}
exports.HealthTest = HealthTest;
exports.HealthTestModel = database_config_1.sequelize.define('health_tests', {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: core_1.DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: (0, uuid_1.v4)()
    },
    facility: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
