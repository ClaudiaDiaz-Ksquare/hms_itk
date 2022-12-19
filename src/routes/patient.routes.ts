// import { Router, Request, Response } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
// import { isAuthorized } from "../middlewares/isAuthorized";
// import { createAppointment, fetchAppointmentById } from "../firebase";

// export const PatientRouter = Router();

// // Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// // UserRouter.use(isAuthorized)
// // Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización

// // ==================================  L C R U D  ==================================

// // LIST - [GET] all
// // PatienttRouter.get('/', async (req: Request, res: Response) => {

// //     // verificar si están accediendo a la ruta para obtener todos los usuarios
// //     try {
// //         const listedUsers = await getAllAppointments();
// //         res.status(200).send({listedUsers});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't list users. Verify the route"})
// //     }
// // })

// // CREATE - [POST]
// // Este endpoint debe poder ser llamado por todo el mundo
// PatientRouter.post('/newAppointment', async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { date_time, description }  = req.body
    
//     // Checar si falta info
//     if (!date_time) {
//         return res.status(400).send({error: 'Missing fields'})
//     }
    
//     // Checar que el rol sea adecuado
//     try {
//         const appointmentId = await createAppointment(date_time, description);
//         res.status(201).send({
//             appointmentId
//         })
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't post user."})
//     }

// })

// // READ - [GET]
// // Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
// // isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }),
// PatientRouter.get('/:apptId', async (req:Request, res: Response) => {
//     // Dos formas de obtener el userId
//     const id: number = Number(req.params['apptId']);

//     // verificar si existe el id
//     try {
//         const fetchedAppointment = await fetchAppointmentById(id);
//         res.status(200).send({fetchedAppointment});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
//     }

// })

// // // UPDATE - [PUT]
// // PatienttRouter.put('/:userId', async (req: Request, res: Response) => {
// //     // Pasar el id del usuario a actualizar 
// //     const id: string = req.params['userId'];
// //     // const {id}  = req.params 
// //     // Agarrar la info desde lo que se metió al body
// //     const {displayName}  = req.body;
// //     // const username  = req.body.displayName;

// //     if (!displayName) {
// //         return res.status(400).send({error: 'Missing or incorrect fields.'})
// //     }

// //     if (typeof(displayName) !== "string") {
// //         return res.status(400).send({error: 'Please enter a string'})
// //     } 
    
// //     // verificar si existe el id
// //     try {
// //         const updatedUser = await updateAppointment(id, displayName);

// //         res.status(200).send({updatedUser});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
// //     }

// // })


// // // DELETE - [DELETE]
// // // isAuthorized({ roles: ['patient'], allowSameUser: true })
// // PatienttRouter.delete('/:userId', async (req: Request, res: Response) => {
// //     const id: string = req.params['userId'];
// //     const disabled = true;

// //     // verificar si existe el id
// //     try {
// //         const disabledUser = await disableAppointment(id, disabled)
// //         res.status(200).send({disabledUser});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
// //     }
// // })


// // // ==================


// // // CREATE - [POST]
// // // Este endpoint debe poder ser llamado por todo el mundo
// // PatienttRouter.post('/newDr', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req:Request, res: Response) => {
// //     // Agarrar la info desde lo que se metió al body
// //     const { displayName, email, password }  = req.body
    
// //     // Checar si falta info
// //     if (!displayName || !email || !password) {
// //         return res.status(400).send({error: 'Missing fields'})
// //     }
    
// //     // Checar que el rol sea adecuado
// //     try {
// //         const doctorId = await createAppointment(displayName, email, password, 'doctor');
// //         res.status(201).send({
// //             doctorId
// //         })
// //     } catch (error) {
// //         res.status(500).send({error: "Something went wrong, couldn't post doctor."})
// //     }

// // })

// // // UNDO DELETE - [DELETE]
// // // isAuthorized({ roles: ['patient'], allowSameUser: true })
// // // Create an endpoint that can modify the is_active property from the User model back to true. 
// // PatienttRouter.delete('/:userId/undo', async (req: Request, res: Response) => {
// //     const id: string = req.params['userId'];
// //     const disabled = false;

// //     try {
// //         const enabledUser = await enableAppointment(id, disabled)
// //         res.status(200).send({enabledUser});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't enable user. Verify the requested user ID"})
// //     }
// // })