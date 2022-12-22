"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentModel = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentModel = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        patient_id: sequelize_1.DataTypes.INTEGER,
        doctor_id: sequelize_1.DataTypes.INTEGER,
        date: sequelize_1.DataTypes.DATE,
        description: sequelize_1.DataTypes.STRING,
        is_cancelled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize
    });
    // Appointment.belongsTo(Patient)
    // Appointment.belongsTo(Doctor)
};
exports.initAppointmentModel = initAppointmentModel;
