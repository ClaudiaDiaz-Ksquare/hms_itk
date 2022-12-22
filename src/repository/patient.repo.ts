import { DateOnlyDataType } from "sequelize";
import { Patient, Gender } from "../models/patient.model";


// Create operation -> sugiere los parámetros al usar la función
export const createPatient = async (user_id: string, gender: Gender, birthday: DateOnlyDataType, has_covid_vaccine: boolean) => {
    try {
        const patient = await Patient.create({
            user_id,
            gender,
            birthday,
            has_covid_vaccine,
        })

        return patient.id;
    } catch (error) {
        console.error(error);
        return null
        
    }
}

// READ Operation
export const fetchPatientById = async (id: number) => {
    try {
        const fetchedPx = await Patient.findByPk(id);

        return fetchedPx;
    } catch (error) {
        console.error(error);

        return null;
    }
}


// UPDATE operation -> pero no sugiere params por el infer
export const updatePatientById = async (id: number, user_id:string, blood_type: string, risk_factors: string) => {

    try {
        const updatedPx = await Patient.update({
            blood_type,
            risk_factors,
        }, {
            where: {
                id,
                user_id,
            }
        })
        
        return updatedPx;
    } catch (error) {
        console.error(error);
        return null;
    }
}


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
