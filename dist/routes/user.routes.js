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
exports.UserRouter = (0, express_1.Router)();
// ==================================  C R U D  ==================================
// LIST - [GET]
exports.UserRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // verificar si están accediendo a la ruta /all
    try {
        const listedUsers = yield (0, firebase_1.getAllUsers)();
        res.status(200).send({ listedUsers });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list users. Verify the route" });
    }
}));
// CREATE - [POST]
exports.UserRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password } = req.body;
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    // Checar que el rol sea adecuado
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't post user." });
    }
}));
// READ - [GET]
exports.UserRouter.get('/:userID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // pasar el id del usuario a leer, 
    const id = req.params['userID'];
    // verificar si existe el id
    try {
        const fetchedUser = yield (0, firebase_1.readUser)(id);
        res.status(200).send({ fetchedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't read user. The requested route doesn't exist" });
    }
}));
// UPDATE - [PUT]
exports.UserRouter.put('/:userID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pasar el id del usuario a actualizar 
    const id = req.params['userID'];
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
        const updatedUser = yield (0, firebase_1.updateUser)(id, displayName);
        res.status(200).send({ updatedUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't update user. Verify the requested user ID" });
    }
}));
// DELETE - [DELETE]
exports.UserRouter.delete('/:userID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['userID'];
    const disable = true;
    // verificar si existe el id
    try {
        const disabledUser = yield (0, firebase_1.disableUser)(id, disable);
        res.status(200).send({ disabledUser });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't disable user. Verify the requested user ID" });
    }
}));
