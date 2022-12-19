// Create an endpoint where an admin can create a new doctor account (user).  
// Create an endpoint that can modify the is_active property from the User model back to true. 
// Create an endpoint that would LIST all the appointments in the table 
// [Appointments] Create pagination filters for the previous endpoint 
// [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
// [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
// [Appointments] Create a filter where you can receive the information based on is_deleted property 
// [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId 
// Any requirements of this module can change at a later stage

import {  Model, InferCreationAttributes, InferAttributes, DataTypes, CreationOptional, Sequelize } from "sequelize";

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
  declare id: CreationOptional<string>;
  declare user_id: CreationOptional<string>;
  declare description: CreationOptional<string>;

}

export const initAdminModel = (sequelize: Sequelize) =>{

    Admin.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize
    })
}
