// La clase contiene en sus declaraciones lo qua van en las columnas de la tabla del DB. 
// Se ponen sus tipos, si es opcional su creación o si se permiten nulos.  
// Lo mismo se pone en la inicialización del modelo, dentro del objeto.

import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
// type sex = "male" | "female";

// usa <generics> para inferir los atributos de la clase y los tipados
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // genera propiedades en la clase, pero no existen en js solo ts 
    // todo esto es lo que se pasa en el json al hacer un post, a menos de que sea opcional 
    declare user_id: CreationOptional<number>;
    declare role_id: CreationOptional<1 | 2 | 3>;
    declare first_name: string;
    declare last_name: string;
    declare sex: CreationOptional<"male" | "female">;
    declare birthday: Date;
    declare username: string;
    declare passwd: string;
    declare email: CreationOptional<string>;
    declare phone: CreationOptional<number>;
    declare creation_date: Date;
    declare is_deleted: CreationOptional<boolean>;

    // getId(): number {
    //     return this.user_id;
    // }
}

// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
export const initUserModel = (sequelize: Sequelize) => {
    User.init({
    
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        sex: DataTypes.STRING,
        birthday: DataTypes.DATE,
        username: DataTypes.STRING,
        passwd: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        creation_date: DataTypes.DATE,
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
}, { modelName: "User", // que luego se cambia a plural "Todos" pq la DB guarda varias tablaS
    // paranoid: true, // por alguna razón el activarlo hace que falle todo
    // sequelize: sequelize
    sequelize // Instance of sequelize that reflects the connection
})
}