import { InferAttributes } from "sequelize";
import { Doctor } from "../models/doctor.model";



export const paginatedList = async(page_limit:number, page_offset:number) =>{
    try {
        const res = await Doctor.findAll({
            attributes: ['id', 'university', 'license_num'],
            limit: page_limit,
            offset: page_offset,
            where: {
                is_active: true
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}


export const listAllDoctors = async (is_active: boolean) => {
    const res = await Doctor.findAll({
        attributes: ['id', 'university'], 
        where: {
            is_active: true
        }
    })
    return res;
}

// Create operation 
export const createDoctor = async (doctorModel: InferAttributes<Doctor>) => {
    try {
        const doctor = await Doctor.create({
            university: doctorModel.university,
            license_num: doctorModel.license_num,
            specialty_id: doctorModel.specialty_id,
        })

        return doctor;
    } catch (error) {
        console.error(error);
        return null
        
    }
}


export const fetchDoctorById = async (id: number) => {
    try {
        const fetchedDr = await Doctor.findByPk(id);

        return fetchedDr;
    } catch (error) {
        console.error(error);

        return null;
    }
}


export const updateDoctorById = async (id: number, doctorModel: InferAttributes<Doctor>) => {

    try {
        const updatedDr = await Doctor.update({
            consulting_room: doctorModel.consulting_room,
            // phone: doctorModel.phone,
        }, {
            where: {
                id: id
            }
        })
        
        return updatedDr;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const deleteDoctorById = async (id: number) => {
    try {
        const inactiveDr = await Doctor.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        })
        return inactiveDr;
    } catch (error) {
        console.error(error);
        return null;
    }
}