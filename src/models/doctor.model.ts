
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize" 
import { Appointment } from "./appointment.model";
import { User } from "./user.model";

export class Doctor extends Model<InferAttributes<Doctor>, InferCreationAttributes<Doctor>> {
    declare id: CreationOptional<number>;
    declare user_id: string;
    declare university: string;
    declare license_num: number;
    declare specialty: string;
    declare consulting_room: CreationOptional<number>;
}

export const initDoctorModel = (sequelize: Sequelize) => {

    Doctor.init ({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        university: DataTypes.STRING,
        license_num: DataTypes.INTEGER,
        specialty: DataTypes.STRING,
        consulting_room: DataTypes.INTEGER,
    }, {sequelize
        })
        // Doctor.belongsTo(User);
        // Doctor.hasMany(Appointment);
}
