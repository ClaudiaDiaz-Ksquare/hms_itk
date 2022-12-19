"use strict";
// Create an endpoint that would LIST all the appointments in the table 
// [Appointments] Create pagination filters for the previous endpoint 
// [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
// [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
// [Appointments] Create a filter where you can receive the information based on is_deleted property 
// [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId 
// Any requirements of this module can change at a later stage
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentModel = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentModel = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: sequelize_1.DataTypes.STRING,
        doctor_id: sequelize_1.DataTypes.STRING,
        date_time: sequelize_1.DataTypes.DATE,
        description: sequelize_1.DataTypes.STRING,
        is_cancelled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize
    });
};
exports.initAppointmentModel = initAppointmentModel;
