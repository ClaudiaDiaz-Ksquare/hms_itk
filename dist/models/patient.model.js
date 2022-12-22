"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.Patient = void 0;
const sequelize_1 = require("sequelize");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
const initPatientModel = (sequelize) => {
    Patient.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: sequelize_1.DataTypes.STRING,
        gender: sequelize_1.DataTypes.STRING,
        birthday: sequelize_1.DataTypes.DATEONLY,
        blood_type: sequelize_1.DataTypes.STRING,
        has_covid_vaccine: sequelize_1.DataTypes.BOOLEAN,
        risk_factors: sequelize_1.DataTypes.STRING,
    }, { sequelize
    });
    // Patient.belongsTo(User), {
    //     foreignKey: "id",
    //     targetKey: "user_id",
    // };
};
exports.initPatientModel = initPatientModel;
