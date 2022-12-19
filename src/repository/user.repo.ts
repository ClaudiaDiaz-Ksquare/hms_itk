// Generar funciones y métodos que van a interactuar con sequelize y mi modelo

import { InferAttributes } from "sequelize";
import { User } from "../models/user.model";


// LIST
export const paginatedList = async(page_limit:number, page_offset:number) =>{
    try {
        const res = await User.findAll({
            attributes: ['id', 'full_name', 'email'],
            limit: page_limit,
            offset :page_offset,
            where: {
                is_active: true
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}

export const listAllUsers = async () => {
    const res = await User.findAll({
        attributes: ['id', 'full_name'], // SELECT id FROM Users WHERE is_active = true;
        where: {
            is_active: true
        }
    })

    return res;
}

// CREATE - Create operation on Postgres
export const createUserPsql = async (id:string, full_name:string, email: string, passwd: string, role : string) => {
    try {
        const newUser = await User.create({
            id,
            full_name,
            email,
            passwd,
            role,
        })
        
        return newUser.id;
    } catch (error) {
        console.error(error);
        return null; // por si falla, que regrese algún id aunque sea
    }
}


// READ Operation
export const fetchUserById = async (id:string) => {
    try {
        const userFetched = await User.findByPk(id);

        return userFetched;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// UPDATE Operation
// Infer attributes para no pasar cada cosa/atributo del modelo
export const updateUserById = async (id:string, full_name: string) => {
    try {
        const updatedRows = await User.update({
            full_name,
        }, {
            where:{
                id,
            }
        });
        
        return updatedRows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// DELETE operation (SOFT)
export const deleteUserById = async (id:string) => {
    try {
        const inactiveUser = await User.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        })
        return inactiveUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// UNDO DELETE operation (SOFT)
export const undoDeleteUserById = async (id:string) => {
    try {
        const activeUser = await User.update({
            is_active: true
        }, {
            where: {
                id: id
            }
        })
        return activeUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}