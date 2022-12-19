import { InferAttributes } from "sequelize";
import {  Patient } from "../models/patient.model";



export const paginatedList = async(page_limit:number, page_offset:number) =>{
    try {
        const res = await Patient.findAll({
            attributes: ['id', 'sex', 'birthday'],
            limit: page_limit,
            offset :page_offset,
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


export const listAllPatients = async (is_active: boolean) => {
    const res = await Patient.findAll({
        attributes: ['id', 'sex', 'birthday'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_active: true
        }
    })
    return res;
}

// Create operation 
export const createPatient = async (patientModel: InferAttributes<Patient>) => {
    try {
        const patient = await Patient.create({
            birthday: patientModel.birthday,
            sex: patientModel.sex,
            is_active: patientModel.is_active,
        })

        return patient;
    } catch (error) {
        console.error(error);
        return null
        
    }
}


export const fetchPatientById = async (id: number) => {
    try {
        const fetchedPx = await Patient.findByPk(id);

        return fetchedPx;
    } catch (error) {
        console.error(error);

        return null;
    }
}


export const updatePatientById = async (id: number, patientModel: InferAttributes<Patient>) => {

    try {
        const updatedPx = await Patient.update({
            // sex: patientModel.sex,
            // birthday: patientModel.birthday,
            has_covid_vaccine: patientModel.has_covid_vaccine,
            risk_factors: patientModel.risk_factors,
        }, {
            where: {
                id: id
            }
        })
        
        return updatedPx;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const deletePatientById = async (id: number) => {
    try {
        const inactivePx = await Patient.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        })
        return inactivePx;
    } catch (error) {
        console.error(error);
        return null;
    }
}