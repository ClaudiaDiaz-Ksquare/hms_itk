// Create an endpoint that would LIST all the appointments in the table 
// [Appointments] Create pagination filters for the previous endpoint 
// [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
// [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
// [Appointments] Create a filter where you can receive the information based on is_deleted property 
// [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId 
// Any requirements of this module can change at a later stage

import {  Model, InferCreationAttributes, InferAttributes, DataTypes, CreationOptional, Sequelize } from "sequelize";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
    declare id: CreationOptional<string>;
    declare patient_id: string;
    declare doctor_id: string;
    declare date_time: Date;
    declare description: CreationOptional<string>;
    declare is_cancelled: CreationOptional<boolean>;

}

export const initAppointmentModel = (sequelize: Sequelize) =>{

    Appointment.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: DataTypes.STRING,
        doctor_id: DataTypes.STRING,
        date_time: DataTypes.DATE,
        description: DataTypes.STRING,
        is_cancelled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize
    })
}