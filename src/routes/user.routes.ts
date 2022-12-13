import { Router, Request, Response } from "express";
import { read } from "fs";
import { type, userInfo } from "os";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
import { User } from "../models/hms.model";

export const UserRouter = Router();


// ==================================  C R U D  ==================================

// LIST - [GET]
UserRouter.get('/all', async (req: Request, res: Response) => {

    // verificar si están accediendo a la ruta /all
    try {
        const listedUsers = await getAllUsers();
        res.status(200).send({listedUsers});
    } catch (error) {
        res.status(400).send({error: "Couldn't list users. Verify the route"})
    }
})

// CREATE - [POST]
UserRouter.post('/newUser',async (req:Request, res: Response) => {
    // Agarrar la info desde lo que se metió al body
    const { displayName, email, password }  = req.body
    
    // Checar si falta info
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }
    
    // Checar que el rol sea adecuado
    try {
        const userId = await createUser(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't post user."})
    }

})

// READ - [GET]
UserRouter.get('/:userID', async (req: Request, res: Response) => {
    // pasar el id del usuario a leer, 
    const id: string = req.params['userID'];

    // verificar si existe el id
    try {
        const fetchedUser = await readUser(id);
        res.status(200).send({fetchedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
    }

})

// UPDATE - [PUT]
UserRouter.put('/:userID', async (req: Request, res: Response) => {
    // Pasar el id del usuario a actualizar 
    const id: string = req.params['userID'];
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
        const updatedUser = await updateUser(id, displayName);

        res.status(200).send({updatedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
    }

})


// DELETE - [DELETE]
UserRouter.delete('/:userID', async (req: Request, res: Response) => {
    const id: string = req.params['userID'];
    const disable = true;

    // verificar si existe el id
    try {
        const disabledUser = await disableUser(id, disable)
        res.status(200).send({disabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
    }
})

