import { Request, Response } from "express";
import { Role } from '../firebase';

type authorizationOptions= {
    roles: Role[];
    allowSameUser: boolean
}

// Sirva como Middleware
// Nos deje configurar que roles tienen acceso a un endpoint
// Nos debe de dejar sobreescribir el permiso si el mismo usuario dueno del recurso quiere accederlo a pesar de no tener permisos
export const isAuthorized = (options: authorizationOptions) => {
    return (req: Request, res: Response, next: Function) => {
         const { uid, email, role } = res.locals;
         const { userId } = req.params;

         if (email === 'SUPER USER') {
            return next();
         }

         if (options.allowSameUser && userId && userId === uid) {
            return next();
         }

         if (!role) {
            return res.status(403).send();
         }

         if (options.roles.includes(role)) {
            return next()
         }

         return res.status(403).send();
    }
}