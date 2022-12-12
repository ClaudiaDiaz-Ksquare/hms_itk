"use strict";
// La clase contiene en sus declaraciones lo qua van en las columnas de la tabla del DB. 
// Se ponen sus tipos, si es opcional su creación o si se permiten nulos.  
// Lo mismo se pone en la inicialización del modelo, dentro del objeto.
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
// type sex = "male" | "female";
// usa <generics> para inferir los atributos de la clase y los tipados
class User extends sequelize_1.Model {
}
exports.User = User;
// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
const initUserModel = (sequelize) => {
    User.init({
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        first_name: sequelize_1.DataTypes.STRING,
        last_name: sequelize_1.DataTypes.STRING,
        sex: sequelize_1.DataTypes.STRING,
        birthday: sequelize_1.DataTypes.DATE,
        username: sequelize_1.DataTypes.STRING,
        passwd: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.INTEGER,
        creation_date: sequelize_1.DataTypes.DATE,
        is_deleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, { modelName: "User",
        // paranoid: true, // por alguna razón el activarlo hace que falle todo
        // sequelize: sequelize
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initUserModel = initUserModel;
