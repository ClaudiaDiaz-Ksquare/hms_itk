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
exports.AppointmentRouter = void 0;
const express_1 = require("express");
const types_1 = require("util/types");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const appointment_repo_1 = require("../repository/appointment.repo");
exports.AppointmentRouter = (0, express_1.Router)();
// ============ L C R U D  F O R  A P P O I N T M E N T S  ============
/* ******************************************************************
*                                                                   *
*                      P  A   T   I   E   N   T                     *
*                                                                   *
*       Only the role of patient can access these endpoints.        *
*                                                                   *
*       Create a series of endpoints that LCRD appointments        *
*       Create pagination for this resource                         *
*       The delete needs to be soft (do not erase the record)       *
*                                                                   *
****************************************************************** */
// LIST - [GET] paginated
exports.AppointmentRouter.get('/patient/:patientId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['patientId'];
    // const user_id = req.params['userId'];
    // const {uid} = res.locals;
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByPatientId)(+id, limit, offset);
        // if (user_id !== uid) {
        //     throw new Error()
        // }
        if (!paginatedAppointments) {
            return res.status(500).send({
                error: 'Get failed. Verify route and auth'
            });
        }
        if (paginatedAppointments.length === 0) {
            return res.status(400).send({
                error: 'Got empty list'
            });
        }
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
// CREATE - [POST]
exports.AppointmentRouter.post('/:patientId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient_id = req.params['patientId'];
    const { doctor_id, date, description } = req.body;
    if (patient_id && doctor_id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    // Checar si falta info
    if (!patient_id || !doctor_id || !date) {
        return res.status(400).send({ error: 'Missing or incorrect fields' });
    }
    if (!(0, types_1.isDate)(new Date(date))) {
        return res.status(400).send({ error: 'Please enter a valid date (yyyy-mm-dd)' });
    }
    try {
        const appointment = yield (0, appointment_repo_1.createAppointment)(+patient_id, doctor_id, date, description);
        // if (appointment?.patient_id !== res.locals.patient_id) {
        //     throw new Error()
        // }
        res.status(201).send({ appointment });
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, couldn't create appointment." });
    }
}));
// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
exports.AppointmentRouter.get('/appointment/:appointmentId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['appointmentId'];
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    try {
        const fetchedAppointment = yield (0, appointment_repo_1.fetchAppointmentById)(+id);
        res.status(200).send({ fetchedAppointment });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't read appointment. The requested route doesn't exist" });
    }
}));
// DELETE - [DELETE]
exports.AppointmentRouter.delete('/:appointmentId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['appointmentId'];
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    try {
        const disabledAppointment = yield (0, appointment_repo_1.disableAppointmentById)(+id);
        res.status(200).send({ disabledAppointment });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't disable Appointment. Verify the requested Appointment ID" });
    }
}));
/* ****************************************************************************
*                                                                             *
*                            D   O   C   T   O   R                            *
*                                                                             *
*   Only a user with the role of doctor can access these endpoints.           *
*                                                                             *
*   Create an endpoint that only reads appointments assigned to this dr       *
*   Create an endpoint to modify the date or time of the appointment.         *
*   Create filters to get more specific information like:                     *
*       byDate, byPatient, and orderBy=asc|desc.                              *
*   Create pagination for this resource                                       *
*                                                                             *
***************************************************************************** */
// LIST - [GET] 
exports.AppointmentRouter.get('/doctor/:doctorId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'doctor'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['doctorId'];
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByDoctorId)(+id, limit, offset);
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
// UPDATE - [PUT] date
exports.AppointmentRouter.put('/:appointmentId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'doctor'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['appointmentId'];
    const { date } = req.body;
    // const username  = req.body.displayName;
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    if (!date) {
        return res.status(400).send({ error: 'Missing or incorrect fields.' });
    }
    if (!(0, types_1.isDate)(new Date(date))) {
        return res.status(400).send({ error: 'Please enter a valid date (yyyy-mm-dd)' });
    }
    try {
        const updatedAppointment = yield (0, appointment_repo_1.updateAppointmentDateById)(+id, date);
        res.status(200).send({ updatedAppointment });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't update user. Verify the requested user ID" });
    }
}));
// LIST - [GET] paginated by date
exports.AppointmentRouter.get('/filter/byDate/:date', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'doctor'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.params['date']);
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByDate)(date, limit, offset);
        if (!paginatedAppointments) {
            return res.status(500).send({
                error: 'Get failed. Verify route and auth'
            });
        }
        if (paginatedAppointments.length === 0) {
            return res.status(400).send({
                error: 'Got empty list for that day'
            });
        }
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
/* ****************************************************************************
*                                                                             *
*                                A   D   M   I   N                            *
*                                                                             *
*   Create an endpoint to LIST all the appointments in the table              *
*   Create pagination filters for the previous endpoint                       *
*   Create filters:                                                           *
*     Pass a patientId and only see the appointments of that user             *
*     Pass a doctorId and only see the appts where that dr is in charge       *
*     Receive the information based on is_deleted property                    *
*     Modify the order of the information with patientId and the doctorId     *
*                                                                             *
***************************************************************************** */
// LIST - [GET] paginated all
exports.AppointmentRouter.get('/all', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.listAllAppointments)(limit, offset);
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
// LIST - [GET] paginated patient id
exports.AppointmentRouter.get('/filter/byPatientId/:patientId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['patientId'];
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByPatientId)(+id, limit, offset);
        if (!paginatedAppointments) {
            return res.status(500).send({
                error: 'Get failed. Verify route and auth'
            });
        }
        if (paginatedAppointments.length === 0) {
            return res.status(400).send({
                message: 'Got empty list for filter. Try another ID'
            });
        }
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
// LIST - [GET] paginated doctor id
exports.AppointmentRouter.get('/filter/byDoctorId/:doctorId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['doctorId'];
    if (+id <= 0) {
        return res.status(400).send({ error: 'Please enter a valid ID (greater than 0)' });
    }
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByDoctorId)(+id, limit, offset);
        if (!paginatedAppointments) {
            return res.status(500).send({
                error: 'Get failed. Verify route and auth'
            });
        }
        if (paginatedAppointments.length === 0) {
            return res.status(400).send({
                message: 'Got empty list for filter. Try another ID'
            });
        }
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
// LIST - [GET] paginated is_deleted = true
exports.AppointmentRouter.get('/deleted', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = Number(req.query['limit']);
    let offset = Number(req.query['offset']);
    try {
        const paginatedAppointments = yield (0, appointment_repo_1.fetchAppointmentsByIsCancelled)(limit, offset);
        if (!paginatedAppointments) {
            return res.status(500).send({
                error: 'Get failed. Verify route and auth'
            });
        }
        if (paginatedAppointments.length === 0) {
            return res.status(400).send({
                message: 'Got empty list for filter. Try another ID'
            });
        }
        res.status(200).send({ paginatedAppointments });
    }
    catch (error) {
        res.status(400).send({ error: "Couldn't list Appointments" });
    }
}));
