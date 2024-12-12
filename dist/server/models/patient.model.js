"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = exports.privateFields = exports.Patient = void 0;
const core_1 = require("@sequelize/core");
const database_config_1 = require("../database/database.config");
class Patient extends core_1.Model {
}
exports.Patient = Patient;
exports.privateFields = ["password"];
exports.PatientModel = database_config_1.sequelize.define('patients', {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    phone: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: core_1.DataTypes.ENUM("patient", "admin"),
        allowNull: false,
    }
}, {
    timestamps: true,
});
