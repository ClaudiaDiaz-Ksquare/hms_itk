import { Router, Request, Response } from "express";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createUser, disableUser, getAllUsers, readUser, updateUser, enableUser } from "../firebase";
// import { paginatedList, createUserPsql, fetchUserById, updateUserById, deleteUserById, undoDeleteUserById } from "../repository/user.repo"

export const UserRouter = Router();


// Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// UserRouter.use(isAuthorized)
// Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización

// ==================================  L C R U D  ==================================

// LIST - [GET] all
UserRouter.get('/', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {

    try {
        const listedUsers = await  getAllUsers();  // para firebase 
        // const listedUsersPsql = await  paginatedList(2,0); // para postgres
        
        res.status(200).send({listedUsers});
    } catch (error) {
        res.status(400).send({error: "Couldn't list users. Verify the route"})
    }
})

// CREATE - [POST]
// Auth 1. Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
UserRouter.post('/new/patient', async (req:Request, res: Response) => {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password }  = req.body
    
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    // Pasar el rol de paciente a la función de crear
    try {
        const newPatientId = await createUser(displayName, email, password, 'patient'); // para firebase
        // const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        
        res.status(201).send({
              id: newPatientId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't create patient."})
    }

})

UserRouter.post('/new/doctor', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req:Request, res: Response) => {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password }  = req.body
    
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    // Pasar el rol de paciente a la función de crear
    try {
        const newDoctorId = await createUser(displayName, email, password, 'doctor'); // para firebase
        // const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        
        res.status(201).send({
              id: newDoctorId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't create doctor."})
    }

})


// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req:Request, res: Response) => {
    // Dos formas de obtener el userId
    const id: string = req.params['userId'];
    // 2da forma
    // const { uid } = res.locals;

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    try {
        const fetchedUser = await readUser(id); // para firebase
        // const fetchedUserPsql = await fetchUserById(id); // para postgres

        res.status(200).send({fetchedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
    }
})

// UPDATE - [PUT]
UserRouter.put('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
    // Pasar el id del usuario a actualizar 
    const id: string = req.params['userId']; 

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }
    // Agarrar la info desde lo que se metió al body
    const {displayName, email, password}  = req.body;

    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    try {
        const updatedUser = await updateUser(id, displayName, email, password); // para firebase
        // const updatedUserPsql = await updateUserById(id ,displayName); // para postgres
        // console.log(`Number of updated attributes: ${updatedUserPsql}`);
        
        res.status(200).send({updatedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
    }

})


// DELETE - [DELETE]
// Auth 5. A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false
UserRouter.delete('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    if(userInfo.disabled){
        return res.status(200).send({
            message: 'Nothing to do here, this account is already disabled. Try a different user id.'
        });
    }

    try {
        const disabledUser = await disableUser(id) // para firebase
        // const disabledUserPsql = await deleteUserById(id) // para postgres
        // console.log(`Number of users deleted: ${disabledUserPsql}`);

        res.status(200).send({disabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
    }
})


// UNDO DELETE - [PATCH]
// Admin 2. Create an endpoint that can modify the is_active property from the User model back to true. 
UserRouter.patch('/activate/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    if(!userInfo.disabled){
        return res.status(200).send({
            message: 'Nothing to do here, this account is already active. Try a different user id.'
        });
    }

    try {
        const enabledUser = await enableUser(id)  // para firebase
        // const enabledUserPsql = await undoDeleteUserById(id)  // para postgres
        // console.log(`Number of users re-activated: ${enabledUserPsql}`);

        res.status(200).send({enabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't enable user. Verify the requested user ID"})
    }
})


// // CREATE - [POST]
// UserRouter.post('/newAdmin', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: false }), async (req:Request, res: Response) => {
//     // Agarrar la info desde lo que se metió al body
//     const { displayName, email, password  }  = req.body
    
//     // Checar si falta info
//     if (!displayName || !email || !password) {
//         return res.status(400).send({error: 'Missing or incorrect fields'})
//     }

//     try {
//         const adminId = await createUser(displayName, email, password, "admin");
//         console.log(
//             `New admin created! ID: ${adminId} / Email: ${email}`
//           );
//         res.status(201).send({
//             success: "Admin created successfully!", 
//             id: adminId,
//         })

//     } catch (error) {
//         res.status(500).send({error: "Something went wrong, couldn't create admin."})
//     }

// })