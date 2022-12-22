"use strict";
// import { Router, Request, Response } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
// import { isAuthorized } from "../middlewares/isAuthorized";
// import { createAdmin } from "../repository/admin.repo";
// export const AdminRouter = Router();
// // CREATE - [POST]
// AdminRouter.post('/', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password  }  = req.body
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing or incorrect fields'})
//     }
//     try {
//         const adminId = await createAdmin(displayName, email, password, "admin");
//         console.log(
//             `New admin created! ID: ${adminId} / Email: ${email}`
//           );
//         res.status(201).send({
//             success: "Admin created successfully!", 
//             id: adminId,
//         })
//         // return { success: "Admin created successfully!", id: adminId};
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't create admin."})
//     }
// })
