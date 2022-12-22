
import { Doctor } from "../models/doctor.model";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import { Role, User } from "../models/user.model"

// Create operation 
export const createDoctor = async (user_id: string, university: string, license_num: number, specialty: string, consulting_room: number) => {
    try {
        const newDoctor = await Doctor.create({
            user_id,
            university,
            license_num, 
            specialty,
            consulting_room,
        })

        return newDoctor.id;
    } catch (error) {
        console.error(error);
        return null
    }
}


// Read operaTion
export const fetchDoctorById = async (id: number) => {
    try {
        const fetchedDoctor = await Doctor.findByPk(id);

        return fetchedDoctor;
    } catch (error) {
        console.error(error);
        return null;
    }
}

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