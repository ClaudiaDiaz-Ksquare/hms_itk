"use strict";
//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
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
exports.undoDeleteAppointmentById = exports.deleteAppointmentById = exports.updateAppointmentById = exports.fetchAppointmentByIsCancelled = exports.fetchAppointmentByDate = exports.fetchAppointmentByPatientId = exports.fetchAppointmentByDoctorId = exports.fetchAppointmentById = exports.createAppointment = exports.listAppointment = exports.paginatedList = void 0;
const appointment_model_1 = require("../models/appointment.model");
// LIST Appointments
const paginatedList = (page_limit, page_offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield appointment_model_1.Appointment.findAll({
            attributes: ['id', 'patient_id', 'doctor_id', 'date_time'],
            limit: page_limit,
            offset: page_offset,
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
exports.paginatedList = paginatedList;
const listAppointment = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield appointment_model_1.Appointment.findAll({
        attributes: ['id', 'patient_id', 'date_time'],
        where: {
            is_cancelled: false
        }
    });
    return res;
});
exports.listAppointment = listAppointment;
// CREATE
const createAppointment = (patient_id, doctor_id, date_time, apptModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppointmentResult = yield appointment_model_1.Appointment.create({
            patient_id,
            doctor_id,
            date_time,
        });
        return AppointmentResult;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAppointment = createAppointment;
// READ (with filters)
const fetchAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findByPk(id);
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentById = fetchAppointmentById;
const fetchAppointmentByDoctorId = (doctor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
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
exports.fetchAppointmentByDoctorId = fetchAppointmentByDoctorId;
const fetchAppointmentByPatientId = (patient_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
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
exports.fetchAppointmentByPatientId = fetchAppointmentByPatientId;
const fetchAppointmentByDate = (chosenDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAppointment = yield appointment_model_1.Appointment.findAll({
            where: {
                date_time: chosenDate,
            }
        });
        return fetchedAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentByDate = fetchAppointmentByDate;
const fetchAppointmentByIsCancelled = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedCancelledAppointments = yield appointment_model_1.Appointment.findAll({
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
exports.fetchAppointmentByIsCancelled = fetchAppointmentByIsCancelled;
// UPDATE 
const updateAppointmentById = (id, ApptModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAppt = yield appointment_model_1.Appointment.update({
            date_time: ApptModel.date_time,
        }, {
            where: {
                id,
            }
        });
        return updatedAppt;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateAppointmentById = updateAppointmentById;
// DELETE
const deleteAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancelledAppt = yield appointment_model_1.Appointment.update({
            is_cancelled: true
        }, {
            where: {
                id,
            }
        });
        return cancelledAppt;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteAppointmentById = deleteAppointmentById;
const undoDeleteAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const undoCancelledAppt = yield appointment_model_1.Appointment.update({
            is_cancelled: false
        }, {
            where: {
                id,
            }
        });
        return undoCancelledAppt;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.undoDeleteAppointmentById = undoDeleteAppointmentById;
