"use strict";
// Create an endpoint where an admin can create a new doctor account (user).  
// Create an endpoint that can modify the is_active property from the User model back to true. 
// Create an endpoint that would LIST all the appointments in the table 
// [Appointments] Create pagination filters for the previous endpoint 
// [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
// [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
// [Appointments] Create a filter where you can receive the information based on is_deleted property 
// [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId 
// Any requirements of this module can change at a later stage
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAdminModel = exports.Admin = void 0;
const sequelize_1 = require("sequelize");
class Admin extends sequelize_1.Model {
}
exports.Admin = Admin;
const initAdminModel = (sequelize) => {
    Admin.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        user_id: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
    }, {
        sequelize
    });
};
exports.initAdminModel = initAdminModel;
