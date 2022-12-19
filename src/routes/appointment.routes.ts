// import { Router, Request, Response } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
// import { isAuthorized } from "../middlewares/isAuthorized";
// import { createAppointment, disableAppointment, getAllAppointments, readAppointment, updateAppointment, enableAppointment } from "../firebase";

// export const AppointmentRouter = Router();


// // ==================================  L C R U D  ==================================

// // LIST - [GET] all
// AppointmentRouter.get('/', async (req: Request, res: Response) => {

//     // verificar si están accediendo a la ruta para obtener todos los usuarios
//     try {
//         const listedAppointments = await getAllAppointments();
//         res.status(200).send({listedAppointments});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't list Appointments. Verify the route"})
//     }
// })

// // CREATE - [POST]
// // Este endpoint debe poder ser llamado por todo el mundo
// AppointmentRouter.post('/newAppointment', async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password }  = req.body
    
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing fields'})
//     }
    
//     // Checar que el rol sea adecuado
//     try {
//         const appointmentId = await createAppointment(displayName, email, password, 'patient');
//         res.status(201).send({
//             appointmentId
//         })
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't post appointment."})
//     }

// })

// // READ - [GET]
// // Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
// // isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }),
// AppointmentRouter.get('/:appointmentId', async (req:Request, res: Response) => {
//     // Dos formas de obtener el userId
//     const id: string = req.params['appointmentId'];
//     // 2da forma
//     // const { uid } = res.locals;

//     // verificar si existe el id
//     try {
//         const fetchedAppointment = await readAppointment(id);
//         res.status(200).send({fetchedAppointment});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
//     }

// })

// // // UPDATE - [PUT]
// // AppointmentRouter.put('/:userId', async (req: Request, res: Response) => {
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
// //         const updatedUser = await updateUser(id, displayName);

// //         res.status(200).send({updatedUser});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
// //     }

// // })


// // // DELETE - [DELETE]
// // // isAuthorized({ roles: ['patient'], allowSameUser: true })
// // AppointmentRouter.delete('/:userId', async (req: Request, res: Response) => {
// //     const id: string = req.params['userId'];
// //     const disabled = true;

// //     // verificar si existe el id
// //     try {
// //         const disabledUser = await disableUser(id, disabled)
// //         res.status(200).send({disabledUser});
// //     } catch (error) {
// //         res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
// //     }
// // })
