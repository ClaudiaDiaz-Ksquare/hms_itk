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
exports.PatientRouter = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const patient_repo_1 = require("../repository/patient.repo");
exports.PatientRouter = (0, express_1.Router)();
// =========================================  C R U D  =========================================
// CREATE - [POST]
exports.PatientRouter.post('/', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Agarrar la info desde lo que se metió al body
    // const {gender, birthday, has_covid_vaccine} = req.body // pone type any 
    const has_covid_vaccine = req.body.has_covid_vaccine;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const uid = res.locals.uid;
    if (has_covid_vaccine === undefined) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    // Checar si falta info
    if (!gender || !birthday) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    try {
        const newPatientId = yield (0, patient_repo_1.createPatient)(uid, gender, birthday, has_covid_vaccine);
        if (!newPatientId) { // si regresa un null pq los valores del req.body no son correctos
            throw new Error();
        }
        res.status(201).send({
            success: "Patient created successfully!",
            newPatientId
        });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't post patient info. Verify request and path" });
    }
}));
// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
exports.PatientRouter.get('/:patientId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    if (+patientId <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    try {
        const fetchedPatient = yield (0, patient_repo_1.fetchPatientById)(+patientId);
        if ((fetchedPatient === null || fetchedPatient === void 0 ? void 0 : fetchedPatient.user_id) !== res.locals.uid) {
            throw new Error();
        }
        res.status(200).send({ fetchedPatient });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't find Patient. Verify the requested Patient ID" });
    }
}));
// UPDATE - [PUT]
exports.PatientRouter.put('/:patientId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient_id = req.params['patientId'];
    const { uid } = res.locals;
    if (+patient_id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        });
    }
    // Agarrar la info desde lo que se metió al body
    const { blood_type, risk_factors } = req.body;
    if (!risk_factors || !blood_type) {
        return res.status(400).send({ error: 'Missing or incorrect fields.' });
    }
    try {
        const updatedRows = yield (0, patient_repo_1.updatePatientById)(+patient_id, uid, blood_type, risk_factors);
        if (!updatedRows) {
            return res.status(500).send({
                error: 'Update failed. Verify route and auth'
            });
        }
        if (updatedRows[0] === 0) {
            return res.status(400).send({
                error: 'Update failed. Verify route and auth'
            });
        }
        console.log(`Succesfully updated ${updatedRows} patient`);
        res.status(200).send({ updatedRows });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't update Patient. Verify the requested Patient ID" });
    }
}));
// // DELETE - [DELETE]
// // isAuthorized({ roles: ['patient'], allowSameUser: true })
// PatientRouter.delete('/:patientId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
//     const patient_id = req.params['patientId'];
//     try {
//         const deletedPatient = await deletePatientById(+patient_id)
//         res.status(200).send({deletedPatient});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't disable Patient. Verify the requested Patient ID"})
//     }
// })
