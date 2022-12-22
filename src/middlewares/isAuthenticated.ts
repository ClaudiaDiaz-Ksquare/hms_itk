// Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
// Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means. 
// Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT 
// Create a middleware that will check if a user is authenticated and what role it has 
// A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false 
// These requirements can be changed later. 

import  { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Esto es un middleware -> SOLO acepta estos 3 params: req res next
// Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2xhdWRpYSIsInJvbGUiOiJwYXRpZW50IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2htcy1pdGstNjA2MjEiLCJhdWQiOiJobXMtaXRrLTYwNjIxIiwiYXV0aF90aW1lIjoxNjcxNDkwMzQ4LCJ1c2VyX2lkIjoiakNNTUgzdmJuOGR2TTJGR0lWSVR6SDgzWWZlMiIsInN1YiI6ImpDTU1IM3Zibjhkdk0yRkdJVklUekg4M1lmZTIiLCJpYXQiOjE2NzE0OTAzNDgsImV4cCI6MTY3MTQ5Mzk0OCwiZW1haWwiOiJjbGF1ZGlhQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImNsYXVkaWFAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.L28egOlf95JfJ-b7Yx4gB0HceLKDLtY3CcddF9padf2e3PMRE4vbQfX5Q9llU8v3nEbmaIkbtRFlwLNsxypLhCFtJneu43pHm0rbIy2PGnYjvTzj-QkA9Cxp2j6wjgyhPuoRLbBT03lKMPIera7hwYYlT8j6nsNQFnKGU4CsLYMd9VU-gUuPQGMXLOBa9Hwftl28pJaAiHghXPP0i-pWqmiLEosdw6ELg4b9asY9723Ge-O0jpYLgDQ3gC0kEKDRlenFGKfMkzSY69bGuwghmzI1pNkU3nFLUlm7j9_HLyyzE-MX_t9tVk_HQ2B3MRVTqv_kkkSHfQIeZgmZINrO5A

// Auth 4. Create a middleware that will check if a user is authenticated and what role it has 
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