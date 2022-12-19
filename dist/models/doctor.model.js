"use strict";
// Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor 
// Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. 
// Create filters that allow a doctor to get more specific information like byDate, byPatient, and orderBy=asc|desc. 
// Create pagination for this resource 
// Only a user with the role of doctor can access these endpoints. 
// Any requirements of this module can change at a later stage
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorModel = exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
const initDoctorModel = (sequelize) => {
    Doctor.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        user_id: sequelize_1.DataTypes.STRING,
        university: sequelize_1.DataTypes.STRING,
        graduation_year: sequelize_1.DataTypes.INTEGER,
        license_num: sequelize_1.DataTypes.INTEGER,
        specialty_id: sequelize_1.DataTypes.INTEGER,
        phone: sequelize_1.DataTypes.INTEGER,
        consulting_room: sequelize_1.DataTypes.INTEGER,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, { sequelize
    });
};
exports.initDoctorModel = initDoctorModel;
