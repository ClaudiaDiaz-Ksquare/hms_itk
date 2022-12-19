"use strict";
// Generar funciones y métodoss que van a interactuar con sequelize y mi modelo
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.fetchUserById = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
// Create operation
const createUser = (first_name, last_name, birthday, username, passwd, creation_date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_model_1.User.create({
            first_name: first_name,
            last_name: last_name,
            birthday: birthday,
            username: username,
            passwd: passwd,
            creation_date: creation_date,
        });
        return newUser.user_id;
    }
    catch (error) {
        console.error(error);
        return null; // por nsi falla, que regrese algún id aunque sea
    }
});
exports.createUser = createUser;
// READ Operation
const fetchUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFetched = yield user_model_1.User.findByPk(user_id);
        return userFetched;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchUserById = fetchUserById;
// UPDATE Operation
// Infer attributes para no pasar cada cosa/atributo del modelo
const updateUserById = (user_id, userModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUpdated = yield user_model_1.User.update({
            first_name: userModel.first_name,
            last_name: userModel.last_name,
            birthday: userModel.birthday,
            username: userModel.username,
            passwd: userModel.passwd,
            creation_date: userModel.creation_date,
            is_deleted: userModel.is_deleted
        }, {
            where: {
                user_id: userModel.user_id
            }
        });
        return userUpdated;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateUserById = updateUserById;
// DELETE operation (HARD)
// Pasar PARANONID en User.model para NO hacerlo soft, *falla*
const deleteUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDeletedRows = yield user_model_1.User.destroy({
            where: {
                user_id: user_id,
            }
        });
        return userDeletedRows;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteUserById = deleteUserById;
