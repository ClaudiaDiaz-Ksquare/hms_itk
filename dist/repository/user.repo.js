"use strict";
// Generar funciones y métodos que van a interactuar con sequelize y mi modelo
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
exports.undoDeleteUserById = exports.deleteUserById = exports.updateUserById = exports.fetchUserById = exports.createUserPsql = exports.listAllUsers = exports.paginatedList = void 0;
const user_model_1 = require("../models/user.model");
// LIST
const paginatedList = (page_limit, page_offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield user_model_1.User.findAll({
            attributes: ['id', 'full_name', 'email'],
            limit: page_limit,
            offset: page_offset,
            where: {
                is_active: true
            }
        });
        return res;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.paginatedList = paginatedList;
const listAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findAll({
        attributes: ['id', 'full_name'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listAllUsers = listAllUsers;
// CREATE - Create operation on Postgres
const createUserPsql = (id, full_name, email, passwd, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_model_1.User.create({
            id,
            full_name,
            email,
            passwd,
            role,
        });
        return newUser.id;
    }
    catch (error) {
        console.error(error);
        return null; // por si falla, que regrese algún id aunque sea
    }
});
exports.createUserPsql = createUserPsql;
// READ Operation
const fetchUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFetched = yield user_model_1.User.findByPk(id);
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
const updateUserById = (id, full_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRows = yield user_model_1.User.update({
            full_name,
        }, {
            where: {
                id,
            }
        });
        return updatedRows;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateUserById = updateUserById;
// DELETE operation (SOFT)
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inactiveUser = yield user_model_1.User.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        });
        return inactiveUser;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteUserById = deleteUserById;
// UNDO DELETE operation (SOFT)
const undoDeleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeUser = yield user_model_1.User.update({
            is_active: true
        }, {
            where: {
                id: id
            }
        });
        return activeUser;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.undoDeleteUserById = undoDeleteUserById;
