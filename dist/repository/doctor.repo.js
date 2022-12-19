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
exports.deleteDoctorById = exports.updateDoctorById = exports.fetchDoctorById = exports.createDoctor = exports.listAllDoctors = exports.paginatedList = void 0;
const doctor_model_1 = require("../models/doctor.model");
const paginatedList = (page_limit, page_offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield doctor_model_1.Doctor.findAll({
            attributes: ['id', 'university', 'license_num'],
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
const listAllDoctors = (is_active) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield doctor_model_1.Doctor.findAll({
        attributes: ['id', 'university'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listAllDoctors = listAllDoctors;
// Create operation 
const createDoctor = (doctorModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield doctor_model_1.Doctor.create({
            university: doctorModel.university,
            license_num: doctorModel.license_num,
            specialty_id: doctorModel.specialty_id,
        });
        return doctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDoctor = createDoctor;
const fetchDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedDr = yield doctor_model_1.Doctor.findByPk(id);
        return fetchedDr;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchDoctorById = fetchDoctorById;
const updateDoctorById = (id, doctorModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDr = yield doctor_model_1.Doctor.update({
            consulting_room: doctorModel.consulting_room,
            // phone: doctorModel.phone,
        }, {
            where: {
                id: id
            }
        });
        return updatedDr;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateDoctorById = updateDoctorById;
const deleteDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inactiveDr = yield doctor_model_1.Doctor.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        });
        return inactiveDr;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteDoctorById = deleteDoctorById;
