// Importar modelos e inicializar sequelize

import { Sequelize } from "sequelize";
import {  initUserModel } from './hms.model' // Importar lo modelos de la carpeta

export let sequelize: Sequelize;

// Arreglo para guardar los modelos importados
const models = [initUserModel];

// Inicializar Sequelize
export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    // constante que tiene una instancia de la DB, pasamos datos para ingresar a ella
    sequelize = new Sequelize(db_name, db_username, db_password, {

        dialect: 'postgres',
        host: db_hostname,
    })

    for(const initModel of models) {
        initModel(sequelize);
    }

    return sequelize;
}