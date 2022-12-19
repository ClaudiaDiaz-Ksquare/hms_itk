// import { Router, Request, Response } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
// import { isAuthorized } from "../middlewares/isAuthorized";
// import { createUser, disableUser, getAllUsers, readUser, updateUser, enableUser } from "../firebase";
// import { listAllUsers, paginatedList, createUserPsql, fetchUserById, updateUserById, deleteUserById, undoDeleteUserById } from "../repository/user.repo"

// export const AdminRouter = Router();

// // Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// // AdminRouter.use(isAuthorized)
// // Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización

// // ==================================  L C R U D  ==================================

// // LIST - [GET] all
// AdminRouter.get('/', async (req: Request, res: Response) => {

//     // verificar si están accediendo a la ruta para obtener todos los usuarios
//     try {
//         const listedUsers = await  getAllUsers();  // para firebase // paginatedList(2,0);// listAllUsers();
//         const listedUsersPsql = await  listAllUsers(); // para postgres
        
//         res.status(200).send({listedUsers});
//     } catch (error) {
//         res.status(400).send({error: "Couldn't list users. Verify the route"})
//     }
// })

// // CREATE - [POST]
// // Este endpoint debe poder ser llamado por todo el mundo
// AdminRouter.post('/newUser', async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password }  = req.body
    
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing fields'})
//     }
    
//     // Checar que el rol sea adecuado
//     try {
//         const userId = await createUser(displayName, email, password, 'patient'); // para firebase
//         const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        
//         res.status(201).send({
//             user
//         })
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't post user."})
//     }

// })



// // CREATE - [POST]
// // Este endpoint debe poder ser llamado por admins solo
// AdminRouter.post('/newDr', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password }  = req.body
    
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing fields'})
//     }
    
//     // Checar que el rol sea adecuado
//     try {
//         const doctorId = await createUser(displayName, email, password, 'doctor');
//         res.status(201).send({
//             doctorId
//         })
//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't post doctor."})
//     }

// })