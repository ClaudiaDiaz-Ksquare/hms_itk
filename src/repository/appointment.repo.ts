
import { CreationOptional, InferAttributes } from "sequelize";
import {  Appointment  } from "../models/appointment.model";


// =========================================  P A T I E N T S  =========================================
// Create a series of endpoints that need to LIST, Read, Create and Delete appointments 


// LIST Appointments with pagination
export const listAllAppointments = async(limit:number, offset:number) =>{
    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patient_id', 'doctor_id', 'date', 'description', 'is_cancelled'],
            limit: limit,
            offset: offset,
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


// CREATE operation
export const createAppointment = async (patient_id: number, doctor_id: number, date: Date, description: CreationOptional<string>) => {
    try {
        const createdAppointment = await Appointment.create({
            patient_id,
            doctor_id,
            date,
            description,
        })

        return createdAppointment;
    } catch (error) {
        console.error(error);
        return null
    }
}

// READ operation
export const fetchAppointmentById = async (appointment_id: number) => {
    try {
        const fetchedAppointment = await Appointment.findOne({
            where: {
              id: appointment_id,
              is_cancelled: false,
            },
          });
        return fetchedAppointment;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// UPDATE operation
export const updateAppointmentDateById = async (id: number, date: Date) => {

    try {
        const updatedAppointment = await Appointment.update({
            date,
        }, {
            where: {
                id,
            }
        })
        
        return updatedAppointment;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// DELETE operation
export const disableAppointmentById = async (id: number) => {
    try {
        const cancelledAppointment = await Appointment.update({
            is_cancelled: true
        }, {
            where: {
                id,
            }
        })
        return cancelledAppointment;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// // =========================================  F I L T E R S  =========================================


export const fetchAppointmentsByDoctorId = async (doctor_id: number, limit:number, offset:number) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            limit: limit,
            offset: offset,
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


export const fetchAppointmentsByPatientId = async (patient_id: number, limit:number, offset:number) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            limit: limit,
            offset: offset,
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



export const fetchAppointmentsByDate = async (chosenDate: Date, limit:number, offset:number) => {
    try {
        const fetchedAppointment = await Appointment.findAll({
            limit: limit,
            offset: offset,
            where: {
                date: chosenDate,
            }
        });
        return fetchedAppointment;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchAppointmentsByIsCancelled = async (limit:number, offset:number) => {
    try {
        const fetchedCancelledAppointments = await Appointment.findAll({
            limit: limit,
            offset: offset,
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
