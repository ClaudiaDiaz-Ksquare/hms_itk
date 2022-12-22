import { Request, Response } from "express";
import { Role } from '../models/user.model';
// import { Role } from '../firebase';

type authorizationOptions= {
    roles: Role[];
    allowSameUser: boolean
}

// Sirva como Middleware
// Nos deje configurar que roles tienen acceso a un endpoint
// Nos debe de dejar sobreescribir el permiso si el mismo usuario dueno del recurso quiere accederlo a pesar de no tener permisos


// Auth 4. Create a middleware that will check if a user is authenticated and what role it has 
export const isAuthorized = (options: authorizationOptions) => {
    return (req: Request, res: Response, next: Function) => {
         const { uid, email, role } = res.locals;
         const { userId } = req.params;

         if (email === process.env.SUPER_USER) { // lo toma del archivo env 
            return next();
         }

         if (!role) {
            return res.status(403).send();
         }

         if (options.roles.includes(role)) {
            return next()
         }

         if (options.allowSameUser && userId && userId === uid) {
            return next();
         }else{
            return res.status(403).send('No Auth');
         }

         // return res.status(403).send();
    }
}
