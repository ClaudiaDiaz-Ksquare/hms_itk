"use strict";
// Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
// Create pagination for this resource 
// The delete needs to be soft (do not erase the record) 
// Only a user with the role of patient can access these endpoints. 
// Any requirements of this module can change at a later stage
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.Patient = void 0;
const sequelize_1 = require("sequelize");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
const initPatientModel = (sequelize) => {
    Patient.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        user_id: sequelize_1.DataTypes.STRING,
        ss_num: sequelize_1.DataTypes.INTEGER,
        sex: sequelize_1.DataTypes.STRING,
        birthday: sequelize_1.DataTypes.DATE,
        phone: sequelize_1.DataTypes.INTEGER,
        appointment_id: sequelize_1.DataTypes.STRING,
        has_covid_vaccine: sequelize_1.DataTypes.BOOLEAN,
        risk_factors: sequelize_1.DataTypes.STRING,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        }
        // weight: DataTypes.INTEGER,
    }, { sequelize
    });
};
exports.initPatientModel = initPatientModel;
