"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorModel = exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
const initDoctorModel = (sequelize) => {
    Doctor.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: sequelize_1.DataTypes.STRING,
        university: sequelize_1.DataTypes.STRING,
        license_num: sequelize_1.DataTypes.INTEGER,
        specialty: sequelize_1.DataTypes.STRING,
        consulting_room: sequelize_1.DataTypes.INTEGER,
    }, { sequelize
    });
    // Doctor.belongsTo(User);
    // Doctor.hasMany(Appointment);
};
exports.initDoctorModel = initDoctorModel;
