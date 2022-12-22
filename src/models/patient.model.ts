
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, DateOnlyDataType } from "sequelize" 

export type Gender = "male" | "female";
import { User } from "./user.model";

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    declare id: CreationOptional<number>;
    declare user_id: string;
    declare gender: Gender;
    declare birthday: DateOnlyDataType; // DateOnlyDataType;
    declare blood_type: CreationOptional<string>;
    declare has_covid_vaccine: boolean;
    declare risk_factors: CreationOptional<string>;
}

export const initPatientModel = (sequelize: Sequelize) => {

    Patient.init ({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.DATEONLY, // DATEONLY,
        blood_type: DataTypes.STRING,
        has_covid_vaccine: DataTypes.BOOLEAN,
        risk_factors: DataTypes.STRING,
    }, {sequelize
        })

        Patient.belongsTo(User), {
            foreignKey: "id",
            targetKey: "user_id",
        };
}
