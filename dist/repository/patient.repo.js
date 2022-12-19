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
exports.deletePatientById = exports.updatePatientById = exports.fetchPatientById = exports.createPatient = exports.listAllPatients = exports.paginatedList = void 0;
const patient_model_1 = require("../models/patient.model");
const paginatedList = (page_limit, page_offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield patient_model_1.Patient.findAll({
            attributes: ['id', 'sex', 'birthday'],
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
const listAllPatients = (is_active) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield patient_model_1.Patient.findAll({
        attributes: ['id', 'sex', 'birthday'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listAllPatients = listAllPatients;
// Create operation 
const createPatient = (patientModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patient_model_1.Patient.create({
            birthday: patientModel.birthday,
            sex: patientModel.sex,
            is_active: patientModel.is_active,
        });
        return patient;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createPatient = createPatient;
const fetchPatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedPx = yield patient_model_1.Patient.findByPk(id);
        return fetchedPx;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchPatientById = fetchPatientById;
const updatePatientById = (id, patientModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPx = yield patient_model_1.Patient.update({
            // sex: patientModel.sex,
            // birthday: patientModel.birthday,
            has_covid_vaccine: patientModel.has_covid_vaccine,
            risk_factors: patientModel.risk_factors,
        }, {
            where: {
                id: id
            }
        });
        return updatedPx;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updatePatientById = updatePatientById;
const deletePatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inactivePx = yield patient_model_1.Patient.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        });
        return inactivePx;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deletePatientById = deletePatientById;
