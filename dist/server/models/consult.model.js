"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationModel = exports.Consultation = void 0;
const core_1 = require("@sequelize/core");
const database_config_1 = require("../database/database.config");
class Consultation extends core_1.Model {
}
exports.Consultation = Consultation;
exports.ConsultationModel = database_config_1.sequelize.define('consultations', {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patientId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: core_1.DataTypes.STRING,
        allowNull: false
    },
    appointmentDateTime: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    consultationUrl: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    doctorName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: core_1.DataTypes.ENUM("pending", "confirmed", "rejected", "completed"),
        allowNull: false,
    },
}, {
    timestamps: true,
});
