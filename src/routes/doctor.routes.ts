
import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createDoctor, fetchDoctorById} from  "../repository/doctor.repo";

export const DoctorRouter = Router();

// [POST]
//Create an endpoint where an admin can create a new doctor account (user).  
DoctorRouter.post('/', isAuthenticated, isAuthorized({roles: ['admin', 'doctor'], allowSameUser:true}), async (req: Request, res: Response) => {
    const { university, license_num, specialty, consulting_room} = req.body;
    const {uid} = res.locals;

    if (!university || !license_num || !specialty) {
        return res.status(400).send({ error: 'Missing or incorrect fields'})
    }

    if (license_num <= 0) {
        return res.status(400).send({ error: 'Enter a valid professional license (number > 0)'})
    }

    try {
        const newDoctorId = await createDoctor(uid, university, license_num, specialty, consulting_room);
        res.status(201).send({
            success: "Doctor created successfully!", 
            newDoctorId,
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't post doctor info. Verify request and path"})
    }
})

// [GET]
DoctorRouter.get('/:doctorId', isAuthenticated, isAuthorized({roles: ['admin', 'doctor'], allowSameUser:true}), async (req: Request, res: Response) => {
    const doctor_id = req.params['doctorId'];
    const {uid} = res.locals;

    if (+doctor_id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    try {
        const fetchedDoctor = await fetchDoctorById(+doctor_id);
    if (fetchedDoctor?.user_id !== uid) {
        throw new Error()
    }
        res.status(200).send({fetchedDoctor});
    } catch (error) {
        return  res.status(400).send({error: "Couldn't find Doctor. Verify the requested Route"})
    }

})

