//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 

import { InferAttributes } from "sequelize";
import {  Appointment  } from "../models/appointment.model";

// LIST Appointments
export const paginatedList = async(page_limit:number, page_offset:number) =>{
    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patient_id', 'doctor_id', 'date_time'],
            limit: page_limit,
            offset: page_offset,
            where: {
                is_cancelled: false
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}


export const listAppointment  = async () => {
    const res = await Appointment.findAll({
        attributes: ['id', 'patient_id', 'date_time'], 
        where: {
            is_cancelled: false
        }
    })
    return res;
}

// CREATE
export const createAppointment = async (patient_id: string, doctor_id: string, date_time: Date, apptModel: InferAttributes<Appointment>) => {
    try {
        const AppointmentResult = await Appointment.create({
            patient_id,
            doctor_id,
            date_time,
        })


        return AppointmentResult;
    } catch (error) {
        console.error(error);
        return null
        
    }
}

// READ (with filters)
export const fetchAppointmentById = async (id: number) => {
    try {
        const fetchedAppointment = await Appointment.findByPk(id);
        
        return fetchedAppointment;
    } catch (error) {
        console.error(error);

        return null;
    }
}

export const fetchAppointmentByDoctorId = async (doctor_id: string) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            where: {
                doctor_id,
            }
        });
        return fetchedAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const fetchAppointmentByPatientId = async (patient_id: string) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            where: {
                patient_id,
            }
        });
        return fetchedAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const fetchAppointmentByDate = async (chosenDate: Date) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            where: {
                date_time: chosenDate,
            }
        });
        return fetchedAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}

export const fetchAppointmentByIsCancelled = async () => {
    try {
        const fetchedCancelledAppointments = await Appointment.findAll({
            where: {
                is_cancelled: true,
            }
        });
        return fetchedCancelledAppointments;

    } catch (error) {
        console.error(error);

        return null;
    }
}


// UPDATE 
export const updateAppointmentById = async (id: number, ApptModel: InferAttributes<Appointment>) => {

    try {
        const updatedAppt = await Appointment.update({
            date_time: ApptModel.date_time,
        }, {
            where: {
                id,
            }
        })
        
        return updatedAppt;
    } catch (error) {
        console.error(error);
        return null;
    }


}


// DELETE
export const deleteAppointmentById = async (id: number) => {
    try {
        const cancelledAppt = await Appointment.update({
            is_cancelled: true
        }, {
            where: {
                id,
            }
        })
        return cancelledAppt;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const undoDeleteAppointmentById = async (id: number) => {
    try {
        const undoCancelledAppt = await Appointment.update({
            is_cancelled: false
        }, {
            where: {
                id,
            }
        })
        return undoCancelledAppt;
    } catch (error) {
        console.error(error);
        return null;
    }
}