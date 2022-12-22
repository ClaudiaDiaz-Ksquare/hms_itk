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
exports.updatePatientById = exports.fetchPatientById = exports.createPatient = void 0;
const patient_model_1 = require("../models/patient.model");
// Create operation -> sugiere los parámetros al usar la función
const createPatient = (user_id, gender, birthday, has_covid_vaccine) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patient_model_1.Patient.create({
            user_id,
            gender,
            birthday,
            has_covid_vaccine,
        });
        return patient.id;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createPatient = createPatient;
// READ Operation
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
// UPDATE operation -> pero no sugiere params por el infer
const updatePatientById = (id, user_id, blood_type, risk_factors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPx = yield patient_model_1.Patient.update({
            blood_type,
            risk_factors,
        }, {
            where: {
                id,
                user_id,
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
// // DELETE 
// export const deletePatientById = async (id: number) => {
//     try {
//         const deletedPx = await Patient.destroy({
//              where: {
//                 id: id
//             }
//         })
//         return deletedPx;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
