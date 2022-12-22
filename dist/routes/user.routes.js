"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const admin = __importStar(require("firebase-admin")); // npm install firebase-admin --save
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const firebase_1 = require("../firebase");
// import { paginatedList, createUserPsql, fetchUserById, updateUserById, deleteUserById, undoDeleteUserById } from "../repository/user.repo"
exports.UserRouter = (0, express_1.Router)();
// Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// UserRouter.use(isAuthorized)
// Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización
// ==================================  L C R U D  ==================================
// LIST - [GET] all
exports.UserRouter.get('/', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listedUsers = yield (0, firebase_1.getAllUsers)(); // para firebase 
        // const listedUsersPsql = await  paginatedList(2,0); // para postgres
        res.status(200).send({ listedUsers });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list users. Verify the route" });
    }
}));
// CREATE - [POST]
// Auth 1. Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
exports.UserRouter.post('/new/patient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password } = req.body;
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    // Pasar el rol de paciente a la función de crear
    try {
        const newPatientId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient'); // para firebase
        // const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        res.status(201).send({
            id: newPatientId
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't create patient." });
    }
}));
exports.UserRouter.post('/new/doctor', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password } = req.body;
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    // Pasar el rol de paciente a la función de crear
    try {
        const newDoctorId = yield (0, firebase_1.createUser)(displayName, email, password, 'doctor'); // para firebase
        // const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        res.status(201).send({
            id: newDoctorId
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't create doctor." });
    }
}));
// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
exports.UserRouter.get('/:userId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Dos formas de obtener el userId
    const id = req.params['userId'];
    // 2da forma
    // const { uid } = res.locals;
    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    try {
        const fetchedUser = yield (0, firebase_1.readUser)(id); // para firebase
        // const fetchedUserPsql = await fetchUserById(id); // para postgres
        res.status(200).send({ fetchedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't read user. The requested route doesn't exist" });
    }
}));
// UPDATE - [PUT]
exports.UserRouter.put('/:userId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pasar el id del usuario a actualizar 
    const id = req.params['userId'];
    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password } = req.body;
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    try {
        const updatedUser = yield (0, firebase_1.updateUser)(id, displayName, email, password); // para firebase
        // const updatedUserPsql = await updateUserById(id ,displayName); // para postgres
        // console.log(`Number of updated attributes: ${updatedUserPsql}`);
        res.status(200).send({ updatedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't update user. Verify the requested user ID" });
    }
}));
// DELETE - [DELETE]
// Auth 5. A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false
exports.UserRouter.delete('/:userId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['userId'];
    const userInfo = yield admin.auth().getUser(id);
    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    if (userInfo.disabled) {
        return res.status(200).send({
            message: 'Nothing to do here, this account is already disabled. Try a different user id.'
        });
    }
    try {
        const disabledUser = yield (0, firebase_1.disableUser)(id); // para firebase
        // const disabledUserPsql = await deleteUserById(id) // para postgres
        // console.log(`Number of users deleted: ${disabledUserPsql}`);
        res.status(200).send({ disabledUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't disable user. Verify the requested user ID" });
    }
}));
// UNDO DELETE - [PATCH]
// Admin 2. Create an endpoint that can modify the is_active property from the User model back to true. 
exports.UserRouter.patch('/activate/:userId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['userId'];
    const userInfo = yield admin.auth().getUser(id);
    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    if (!userInfo.disabled) {
        return res.status(200).send({
            message: 'Nothing to do here, this account is already active. Try a different user id.'
        });
    }
    try {
        const enabledUser = yield (0, firebase_1.enableUser)(id); // para firebase
        // const enabledUserPsql = await undoDeleteUserById(id)  // para postgres
        // console.log(`Number of users re-activated: ${enabledUserPsql}`);
        res.status(200).send({ enabledUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't enable user. Verify the requested user ID" });
    }
}));
// // CREATE - [POST]
// UserRouter.post('/newAdmin', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password  }  = req.body
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing or incorrect fields'})
//     }
//     try {
//         const adminId = await createUser(displayName, email, password, "admin");
//         console.log(
//             `New admin created! ID: ${adminId} / Email: ${email}`
//           );
//         res.status(201).send({
//             success: "Admin created successfully!", 
//             id: adminId,
//         })
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't create admin."})
//     }
// })
