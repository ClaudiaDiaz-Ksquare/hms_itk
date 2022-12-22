
import {  Model, InferCreationAttributes, InferAttributes, DataTypes, CreationOptional, Sequelize } from "sequelize";

import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
    declare id: CreationOptional<number>;
    declare patient_id: number;
    declare doctor_id: number;
    declare date: Date; 
    declare description: CreationOptional<string>;
    declare is_cancelled: CreationOptional<boolean>;

}

export const initAppointmentModel = (sequelize: Sequelize) =>{

    Appointment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        patient_id: DataTypes.INTEGER,
        doctor_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
        description: DataTypes.STRING,
        is_cancelled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize
    })

    Appointment.belongsTo(Patient)
    Appointment.belongsTo(Doctor)

}
