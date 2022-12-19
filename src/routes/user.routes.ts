import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createUser, disableUser, getAllUsers, readUser, updateUser, enableUser } from "../firebase";
import { listAllUsers, paginatedList, createUserPsql, fetchUserById, updateUserById, deleteUserById, undoDeleteUserById } from "../repository/user.repo"

export const UserRouter = Router();

// Si quisieramos autorizar a todos los usuarios, de una vez pasamos el middleware a todo con .use
// UserRouter.use(isAuthorized)
// Sino, meter el middleware isAuthorized() solo en ciertos endpoints que querramos que tengan autorización

// ==================================  L C R U D  ==================================

// LIST - [GET] all
UserRouter.get('/', async (req: Request, res: Response) => {

    // verificar si están accediendo a la ruta para obtener todos los usuarios
    try {
        const listedUsers = await  getAllUsers();  // para firebase // paginatedList(2,0);// listAllUsers();
        const listedUsersPsql = await  listAllUsers(); // para postgres
        
        res.status(200).send({listedUsers});
    } catch (error) {
        res.status(400).send({error: "Couldn't list users. Verify the route"})
    }
})

// CREATE - [POST]
// Este endpoint debe poder ser llamado por todo el mundo
UserRouter.post('/newUser', async (req:Request, res: Response) => {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password }  = req.body
    
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }
    
    // Checar que el rol sea adecuado
    try {
        const userId = await createUser(displayName, email, password, 'patient'); // para firebase
        const user = await createUserPsql(userId, displayName, email, password, 'patient'); // para postgres
        
        res.status(201).send({
            user
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't post user."})
    }

})

// READ - [GET]
// Este endpoint solo debe poder ser llamado por el rol de admin y el usuario dueño de este recurso
// UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req:Request, res: Response) => {
UserRouter.get('/:userId', async (req:Request, res: Response) => {
    // Dos formas de obtener el userId
    const id: string = req.params['userId'];
    // 2da forma
    // const { uid } = res.locals;

    // verificar si existe el id
    try {
        const fetchedUser = await readUser(id); // para firebase
        const fetchedUserPsql = await fetchUserById(id); // para postgres


        res.status(200).send({fetchedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
    }

})

// UPDATE - [PUT]
UserRouter.put('/:userId', async (req: Request, res: Response) => {
    // Pasar el id del usuario a actualizar 
    const id: string = req.params['userId'];
    // const {id}  = req.params 
    // Agarrar la info desde lo que se metió al body
    const {displayName}  = req.body;
    // const username  = req.body.displayName;

    if (!displayName) {
        return res.status(400).send({error: 'Missing or incorrect fields.'})
    }

    if (typeof(displayName) !== "string") {
        return res.status(400).send({error: 'Please enter a string'})
    } 
    
    // verificar si existe el id
    try {
        const updatedUser = await updateUser(id, displayName); // para firebase
        const updatedUserPsql = await updateUserById(id ,displayName); // para postgres
        console.log(`Number of updated attributes: ${updatedUserPsql}`);
        
        res.status(200).send({updatedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
    }

})


// DELETE - [DELETE]
// isAuthorized({ roles: ['patient'], allowSameUser: true })
UserRouter.delete('/:userId', async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const is_disabled = true;

    // verificar si existe el id
    try {
        const disabledUser = await disableUser(id, is_disabled) // para firebase
        const disabledUserPsql = await deleteUserById(id) // para postgres
        console.log(`Number of users deleted: ${disabledUserPsql}`);

        res.status(200).send({disabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
    }
})


// UNDO DELETE - [DELETE]
// isAuthorized({ roles: ['patient'], allowSameUser: true })
// Create an endpoint that can modify the is_active property from the User model back to true. 
UserRouter.delete('/:userId/undo', async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const is_disabled = false;

    try {
        const enabledUser = await enableUser(id, is_disabled)  // para firebase
        const enabledUserPsql = await undoDeleteUserById(id)  // para postgres
        console.log(`Number of users re-activated: ${enabledUserPsql}`);

        res.status(200).send({enabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't enable user. Verify the requested user ID"})
    }
})