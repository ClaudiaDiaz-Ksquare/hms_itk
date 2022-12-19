"use strict";
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
exports.UserRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const user_repo_1 = require("../repository/user.repo");
exports.UserRouter = (0, express_1.Router)();
// Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// UserRouter.use(isAuthorized)
// Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización
// ==================================  L C R U D  ==================================
// LIST - [GET] all
exports.UserRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // verificar si están accediendo a la ruta para obtener todos los usuarios
    try {
        const listedUsers = yield (0, firebase_1.getAllUsers)(); // para firebase // paginatedList(2,0);// listAllUsers();
        const listedUsersPsql = yield (0, user_repo_1.listAllUsers)(); // para postgres
        res.status(200).send({ listedUsers });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list users. Verify the route" });
    }
}));
// CREATE - [POST]
// Este endpoint debe poder ser llamado por todo el mundo
exports.UserRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password } = req.body;
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    // Checar que el rol sea adecuado
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient'); // para firebase
        const user = yield (0, user_repo_1.createUserPsql)(userId, displayName, email, password, 'patient'); // para postgres
        res.status(201).send({
            user
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't post user." });
    }
}));
// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
// UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req:Request, res: Response) => {
exports.UserRouter.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Dos formas de obtener el userId
    const id = req.params['userId'];
    // 2da forma
    // const { uid } = res.locals;
    // verificar si existe el id
    try {
        const fetchedUser = yield (0, firebase_1.readUser)(id); // para firebase
        const fetchedUserPsql = yield (0, user_repo_1.fetchUserById)(id); // para postgres
        res.status(200).send({ fetchedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't read user. The requested route doesn't exist" });
    }
}));
// UPDATE - [PUT]
exports.UserRouter.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pasar el id del usuario a actualizar 
    const id = req.params['userId'];
    // const {id}  = req.params 
    // Agarrar la info desde lo que se metió al body
    const { displayName } = req.body;
    // const username  = req.body.displayName;
    if (!displayName) {
        return res.status(400).send({ error: 'Missing or incorrect fields.' });
    }
    if (typeof (displayName) !== "string") {
        return res.status(400).send({ error: 'Please enter a string' });
    }
    // verificar si existe el id
    try {
        const updatedUser = yield (0, firebase_1.updateUser)(id, displayName); // para firebase
        const updatedUserPsql = yield (0, user_repo_1.updateUserById)(id, displayName); // para postgres
        console.log(`Number of updated attributes: ${updatedUserPsql}`);
        res.status(200).send({ updatedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't update user. Verify the requested user ID" });
    }
}));
// DELETE - [DELETE]
// isAuthorized({ roles: ['patient'], allowSameUser: true })
exports.UserRouter.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['userId'];
    const is_disabled = true;
    // verificar si existe el id
    try {
        const disabledUser = yield (0, firebase_1.disableUser)(id, is_disabled); // para firebase
        const disabledUserPsql = yield (0, user_repo_1.deleteUserById)(id); // para postgres
        console.log(`Number of users deleted: ${disabledUserPsql}`);
        res.status(200).send({ disabledUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't disable user. Verify the requested user ID" });
    }
}));
// UNDO DELETE - [DELETE]
// isAuthorized({ roles: ['patient'], allowSameUser: true })
// Create an endpoint that can modify the is_active property from the User model back to true. 
exports.UserRouter.delete('/:userId/undo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['userId'];
    const is_disabled = false;
    try {
        const enabledUser = yield (0, firebase_1.enableUser)(id, is_disabled); // para firebase
        const enabledUserPsql = yield (0, user_repo_1.undoDeleteUserById)(id); // para postgres
        console.log(`Number of users re-activated: ${enabledUserPsql}`);
        res.status(200).send({ enabledUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't enable user. Verify the requested user ID" });
    }
}));
