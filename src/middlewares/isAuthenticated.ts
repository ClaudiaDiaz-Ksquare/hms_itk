// Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
// Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means. 
// Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT 
// Create a middleware that will check if a user is authenticated and what role it has 
// A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false 
// These requirements can be changed later. 

import  { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Esto es un middleware -> SOLO acepta estos 3 params: req res next
export const isAuthenticated = async (req: Request, res: Response, next: Function) => {
    // No authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'No auth' })
    }
    // No correct scheme (Bearer)

    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'No auth' })
    }

    // Check if the token is valid

    const splittedToken = authorization.split('Bearer ');
    if (splittedToken.length !== 2) {
        return res.status(401).send({ error: 'No auth' })
    }

    const token = splittedToken[1];

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        res.locals = {
            ...res.locals,
            email: decodedToken.email,
            uid: decodedToken.uid,
            role: decodedToken.role   
        }
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({error: 'No auth'})
    }
}