import { Router, Request, Response } from "express";
import { DateOnlyDataType } from "sequelize";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { Gender } from "../models/patient.model";
import { createPatient, fetchPatientById, updatePatientById } from "../repository/patient.repo";

export const PatientRouter = Router();


// =========================================  C R U D  =========================================


// CREATE - [POST]
PatientRouter.post('/', isAuthenticated, isAuthorized({roles: ['admin','patient'], allowSameUser:true}), async (req:Request, res: Response) => {
    // Agarrar la info desde lo que se metió al body
    // const {gender, birthday, has_covid_vaccine} = req.body // pone type any 
    const has_covid_vaccine: boolean  = req.body.has_covid_vaccine;
    const gender: Gender  = req.body.gender;
    const birthday: DateOnlyDataType  = req.body.birthday;
    const uid = res.locals.uid;

    if (has_covid_vaccine === undefined) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    // Checar si falta info
    if (!gender || !birthday) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    try {
        const newPatientId = await createPatient(uid, gender, birthday, has_covid_vaccine);
        if(!newPatientId){ // si regresa un null pq los valores del req.body no son correctos
            throw new Error();
        }
        res.status(201).send({
            success: "Patient created successfully!", 
            newPatientId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't post patient info. Verify request and path"})
    }
})

// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
PatientRouter.get('/:patientId', isAuthenticated, isAuthorized({roles: ['admin', 'patient'], allowSameUser:true}), async (req:Request, res: Response) => {
    const { patientId } = req.params;

    if (+patientId <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    try {
        const fetchedPatient = await fetchPatientById(+patientId);
        if (fetchedPatient?.user_id !== res.locals.uid) {
            throw new Error();
        }
        res.status(200).send({fetchedPatient});
    } catch (error) {
        res.status(400).send({error: "Couldn't find Patient. Verify the requested Patient ID"})
    }

})

// UPDATE - [PUT]
PatientRouter.put('/:patientId',  isAuthenticated, isAuthorized({roles: ['admin', 'patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    const patient_id = req.params['patientId'];
    const {uid} = res.locals;
    if (+patient_id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    // Agarrar la info desde lo que se metió al body
    const { blood_type, risk_factors}  = req.body;

    if (!risk_factors || !blood_type) {
        return res.status(400).send({error: 'Missing or incorrect fields.'})
    }

    try {
        const updatedRows = await updatePatientById(+patient_id, uid, blood_type, risk_factors);
        if (!updatedRows) {
            return res.status(500).send({
                error: 'Update failed. Verify route and auth'
            })
        }
        if (updatedRows[0] === 0) {
            return res.status(400).send({
                error: 'Update failed. Verify route and auth'
            })
        }
        console.log(`Succesfully updated ${updatedRows} patient`);

        res.status(200).send({updatedRows});
    } catch (error) {
        res.status(400).send({error: "Couldn't update Patient. Verify the requested Patient ID"})
    }

})


// // DELETE - [DELETE]
// // isAuthorized({ roles: ['patient'], allowSameUser: true })
// PatientRouter.delete('/:patientId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
//     const patient_id = req.params['patientId'];

//     try {
//         const deletedPatient = await deletePatientById(+patient_id)
//         res.status(200).send({deletedPatient});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't disable Patient. Verify the requested Patient ID"})
//     }
// })
