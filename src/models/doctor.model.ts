// Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor 
// Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. 
// Create filters that allow a doctor to get more specific information like byDate, byPatient, and orderBy=asc|desc. 
// Create pagination for this resource 
// Only a user with the role of doctor can access these endpoints. 
// Any requirements of this module can change at a later stage

import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize" 

export class Doctor extends Model<InferAttributes<Doctor>, InferCreationAttributes<Doctor>> {
    declare id: CreationOptional<string>;
    declare user_id: CreationOptional<string>;
    declare university: string;
    declare graduation_year: CreationOptional<number>;
    declare license_num: number;
    declare specialty_id: number;
    declare phone: CreationOptional<number>;
    declare consulting_room: CreationOptional<number>;
    declare is_active: CreationOptional<boolean>;

}

export const initDoctorModel = (sequelize: Sequelize) => {

    Doctor.init ({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        university: DataTypes.STRING,
        graduation_year: DataTypes.INTEGER,
        license_num: DataTypes.INTEGER,
        specialty_id: DataTypes.INTEGER,
        phone: DataTypes.INTEGER,
        consulting_room: DataTypes.INTEGER,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {sequelize
        })
}