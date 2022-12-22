"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
        },
        full_name: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        passwd: sequelize_1.DataTypes.STRING,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        sequelize
    });
    // Uno a uno
    // modelo fuente izq, modelo target der
    // User.hasOne(Patient) ===  Patient.belongsTo(User) pero en archivo patient model
    // foreignkey es la de target
};
exports.initUserModel = initUserModel;
