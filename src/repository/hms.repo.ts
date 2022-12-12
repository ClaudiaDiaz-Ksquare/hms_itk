// Generar funciones y métodoss que van a interactuar con sequelize y mi modelo

import { InferAttributes, Model } from "sequelize";
import { User } from "../models/hms.model";


// Create operation
export const createUser = async (first_name:string, last_name:string, birthday: Date, username: string, passwd: string, creation_date: Date,) => {
    try {
        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            birthday: birthday,
            username: username,
            passwd: passwd,
            creation_date: creation_date,
        })
        
        return newUser.user_id;
    } catch (error) {
        console.error(error);
        return null; // por nsi falla, que regrese algún id aunque sea
    }
}

// READ Operation
export const fetchUserById = async (user_id:number) => {
    try {
        const userFetched = await User.findByPk(user_id);

        return userFetched;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// UPDATE Operation
// Infer attributes para no pasar cada cosa/atributo del modelo
export const updateUserById = async (user_id:number, userModel: InferAttributes<User>) => {
    try {
        const userUpdated = await User.update({
            first_name: userModel.first_name,
            last_name: userModel.last_name,
            birthday: userModel.birthday,
            username: userModel.username,
            passwd: userModel.passwd,
            creation_date: userModel.creation_date,
            is_deleted: userModel.is_deleted
        }, {
            where:{
                user_id: userModel.user_id
            }
        });
        
        return userUpdated;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// DELETE operation (HARD)
// Pasar PARANONID en User.model para NO hacerlo soft, *falla*
export const deleteUserById = async (user_id:number) => {
    try {
        const userDeletedRows = await User.destroy({
            where: {
                user_id: user_id,
            }
        });

        return userDeletedRows;
    } catch (error) {
        console.error(error);
        return null
    }
}