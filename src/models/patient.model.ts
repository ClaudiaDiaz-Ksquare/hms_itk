// Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
// Create pagination for this resource 
// The delete needs to be soft (do not erase the record) 
// Only a user with the role of patient can access these endpoints. 
// Any requirements of this module can change at a later stage

import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize" 

export type Sex = "male" | "female";

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    declare id: CreationOptional<string>;
    declare user_id: CreationOptional<string>;
    declare ss_num: CreationOptional<number>;
    declare sex: Sex;
    declare birthday: Date;
    declare phone: CreationOptional<number>;
    declare appointment_id: CreationOptional<string>;
    declare has_covid_vaccine: CreationOptional<boolean>;
    declare risk_factors: CreationOptional<string>;
    declare is_active: CreationOptional<boolean>;
    // declare weight: CreationOptional<number>;
}

export const initPatientModel = (sequelize: Sequelize) => {

    Patient.init ({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        ss_num: DataTypes.INTEGER,
        sex: DataTypes.STRING,
        birthday: DataTypes.DATE,
        phone: DataTypes.INTEGER,
        appointment_id: DataTypes.STRING,
        has_covid_vaccine: DataTypes.BOOLEAN,
        risk_factors: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
        // weight: DataTypes.INTEGER,
    }, {sequelize
        })
}