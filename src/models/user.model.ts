
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import { Admin } from "./admin.model";
import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";
// La clase contiene en sus declaraciones lo qua van en las columnas de la tabla del DB. 
// Se ponen sus tipos, si es opcional su creación o si se permiten nulos.  
// Lo mismo se pone en la inicialización del modelo, dentro del objeto.

// usa <generics> para inferir los atributos de la clase y los tipados
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // genera propiedades en la clase, pero no existen en js solo ts 
    // todo esto es lo que se pasa en el json al hacer un post, a menos de que sea opcional 
    declare id: CreationOptional<string>;
    declare role: CreationOptional<string>;
    declare full_name: string;
    // declare last_name: string;
    declare email: string;
    declare passwd: string;
    declare is_active: CreationOptional<boolean>;

}

// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
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
        // last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
}, { modelName: "User", // que luego se cambia a plural "Users" pq la DB guarda varias tablaS
    // paranoid: true, // por alguna razón el activarlo me hizo que falle todo
    // sequelize: sequelize , es equivalente a lo de abajo
    sequelize // Instance of sequelize that reflects the connection
})
    // User.hasMany(Patient, {
    //     foreignKey: 'user_id',
    //     sourceKey: 'id',
    // })

    // Patient.belongsTo(User, {
    //     foreignKey: 'user_id',
    //     targetKey: 'id',
    // })
}


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