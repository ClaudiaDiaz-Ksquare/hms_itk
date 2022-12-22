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
exports.fetchAppointmentsByIsCancelled = exports.fetchAppointmentsByDate = exports.fetchAppointmentsByPatientId = exports.fetchAppointmentsByDoctorId = exports.disableAppointmentById = exports.updateAppointmentDateById = exports.fetchAppointmentById = exports.createAppointment = exports.listAllAppointments = void 0;
const appointment_model_1 = require("../models/appointment.model");
// =========================================  P A T I E N T S  =========================================
// Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
// LIST Appointments with pagination
const listAllAppointments = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield appointment_model_1.Appointment.findAll({
            attributes: ['id', 'patient_id', 'doctor_id', 'date', 'description', 'is_cancelled'],
            limit: limit,
            offset: offset,
            where: {
                is_cancelled: false
            }
        });
        return res;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.listAllAppointments = listAllAppointments;
// CREATE operation
const createAppointment = (patient_id, doctor_id, date, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdAppointment = yield appointment_model_1.Appointment.create({
            patient_id,
            doctor_id,
            date,
            description,
        });
        return createdAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAppointment = createAppointment;
// READ operation
const fetchAppointmentById = (appointment_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findOne({
            where: {
                id: appointment_id,
                is_cancelled: false,
            },
        });
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentById = fetchAppointmentById;
// UPDATE operation
const updateAppointmentDateById = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAppointment = yield appointment_model_1.Appointment.update({
            date,
        }, {
            where: {
                id,
            }
        });
        return updatedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateAppointmentDateById = updateAppointmentDateById;
// DELETE operation
const disableAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancelledAppointment = yield appointment_model_1.Appointment.update({
            is_cancelled: true
        }, {
            where: {
                id,
            }
        });
        return cancelledAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.disableAppointmentById = disableAppointmentById;
// // =========================================  F I L T E R S  =========================================
const fetchAppointmentsByDoctorId = (doctor_id, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
            limit: limit,
            offset: offset,
            where: {
                doctor_id,
            }
        });
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentsByDoctorId = fetchAppointmentsByDoctorId;
const fetchAppointmentsByPatientId = (patient_id, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
            limit: limit,
            offset: offset,
            where: {
                patient_id,
            }
        });
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentsByPatientId = fetchAppointmentsByPatientId;
const fetchAppointmentsByDate = (chosenDate, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
            limit: limit,
            offset: offset,
            where: {
                date: chosenDate,
            }
        });
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentsByDate = fetchAppointmentsByDate;
const fetchAppointmentsByIsCancelled = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedCancelledAppointments = yield appointment_model_1.Appointment.findAll({
            limit: limit,
            offset: offset,
            where: {
                is_cancelled: true,
            }
        });
        return fetchedCancelledAppointments;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentsByIsCancelled = fetchAppointmentsByIsCancelled;
