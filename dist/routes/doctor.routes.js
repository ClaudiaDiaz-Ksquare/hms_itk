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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const doctor_repo_1 = require("../repository/doctor.repo");
exports.DoctorRouter = (0, express_1.Router)();
// [POST]
//Create an endpoint where an admin can create a new doctor account (user).  
exports.DoctorRouter.post('/', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'doctor'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { university, license_num, specialty, consulting_room } = req.body;
    const { uid } = res.locals;
    if (!university || !license_num || !specialty) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    if (license_num <= 0) {
        return res.status(400).send({ error: 'Enter a valid professional license (number > 0)' });
    }
    try {
        const newDoctorId = yield (0, doctor_repo_1.createDoctor)(uid, university, license_num, specialty, consulting_room);
        res.status(201).send({
            success: "Doctor created successfully!",
            newDoctorId,
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't post doctor info. Verify request and path" });
    }
}));
// [GET]
exports.DoctorRouter.get('/:doctorId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'doctor'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor_id = req.params['doctorId'];
    const { uid } = res.locals;
    if (+doctor_id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    try {
        const fetchedDoctor = yield (0, doctor_repo_1.fetchDoctorById)(+doctor_id);
        if ((fetchedDoctor === null || fetchedDoctor === void 0 ? void 0 : fetchedDoctor.user_id) !== uid) {
            throw new Error();
        }
        res.status(200).send({ fetchedDoctor });
    }
    catch (error) {
        return res.status(400).send({ error: "Couldn't find Doctor. Verify the requested Route" });
    }
}));
