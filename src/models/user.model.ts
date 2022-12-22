
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export type Role = "patient" | "doctor" | "admin";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare role: CreationOptional<Role>;
    declare full_name: string;
    declare email: string;
    declare passwd: string;
    declare is_active: CreationOptional<boolean>;
}

export const initUserModel = (sequelize: Sequelize) => {
    User.init({
    
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
        },
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
}, { // modelName: "User",
    sequelize
})
// Uno a uno
// modelo fuente izq, modelo target der
// User.hasOne(Patient) ===  Patient.belongsTo(User) pero en archivo patient model
// foreignkey es la de target

}
