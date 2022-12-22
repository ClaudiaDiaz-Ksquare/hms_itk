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
exports.fetchDoctorById = exports.createDoctor = void 0;
const doctor_model_1 = require("../models/doctor.model");
// Create operation 
const createDoctor = (user_id, university, license_num, specialty, consulting_room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = yield doctor_model_1.Doctor.create({
            user_id,
            university,
            license_num,
            specialty,
            consulting_room,
        });
        return newDoctor.id;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDoctor = createDoctor;
// Read operaTion
const fetchDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedDoctor = yield doctor_model_1.Doctor.findByPk(id);
        return fetchedDoctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchDoctorById = fetchDoctorById;
// // Update
// export const updateDoctorById = async (id: number, university: string, license_num: number, specialty: string, phone: number, consulting_room: number) => {
//     try {
//         const updatedDoctor = await Doctor.update({
//             university,
//             license_num,
//             specialty,
//             phone,
//             consulting_room,
//         }, {
//             where: {
//                 id: id
//             }
//         })
//         return updatedDoctor;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
// // DELETE 
// export const deleteDoctorById = async (id: number) => {
//     try {
//         const disabledDoctor = await Doctor.destroy({
//             where: {
//                 id: id
//             }
//         })
//         return disabledDoctor;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
