"use strict";
// Importar modelos e inicializar sequelize
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const hms_model_1 = require("./hms.model"); // Importar lo modelos de la carpeta
// Arreglo para guardar los modelos importados
const models = [hms_model_1.initUserModel];
// Inicializar Sequelize
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    // constante que tiene una instancia de la DB, pasamos datos para ingresar a ella
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
