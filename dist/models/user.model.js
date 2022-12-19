"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
// La clase contiene en sus declaraciones lo qua van en las columnas de la tabla del DB. 
// Se ponen sus tipos, si es opcional su creación o si se permiten nulos.  
// Lo mismo se pone en la inicialización del modelo, dentro del objeto.
// usa <generics> para inferir los atributos de la clase y los tipados
class User extends sequelize_1.Model {
}
exports.User = User;
// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
        },
        full_name: sequelize_1.DataTypes.STRING,
        // last_name: DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        passwd: sequelize_1.DataTypes.STRING,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, { modelName: "User",
        // paranoid: true, // por alguna razón el activarlo me hizo que falle todo
        // sequelize: sequelize , es equivalente a lo de abajo
        sequelize // Instance of sequelize that reflects the connection
    });
    // User.hasMany(Patient, {
    //     foreignKey: 'user_id',
    //     sourceKey: 'id',
    // })
    // Patient.belongsTo(User, {
    //     foreignKey: 'user_id',
    //     targetKey: 'id',
    // })
};
exports.initUserModel = initUserModel;
// User.hasMany(Doctor, {
//     foreignKey: 'user_id',
//     sourceKey: 'id',
// })
// Doctor.belongsTo(User, {
//     foreignKey: 'user_id',
//     targetKey: 'id',
// })
// User.hasMany(Admin, {
//     foreignKey: 'user_id',
//     sourceKey: 'id',
// })
// Admin.belongsTo(User, {
//     foreignKey: 'user_id',
//     targetKey: 'id',
// })
