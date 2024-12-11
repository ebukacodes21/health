"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.Appointment = void 0;
const core_1 = require("@sequelize/core");
const database_config_1 = require("../database/database.config");
class Appointment extends core_1.Model {
}
exports.Appointment = Appointment;
exports.AppointmentModel = database_config_1.sequelize.define('appointments', {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patientId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false
    },
    testId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false
    },
    appointmentDateTime: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    doctorName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: core_1.DataTypes.ENUM("booked", "completed", "cancelled"),
        allowNull: false,
    },
}, {
    timestamps: true,
});
