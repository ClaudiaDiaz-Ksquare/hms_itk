// Configuración de express (conectar routers, middlewares, etc)

import express, { Application, Request, Response } from 'express';
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
// import { firebaseConfig} from './firebaseConfig';
// import {initializeApp } from 'firebase/app';

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

const app: Application = express(); // para el servidor

// Importar routers
import { UserRouter } from './routes/user.routes'
// import { PatientRouter } from './routes/patient.routes'
// import { DoctorRouter } from './routes/doctor.routes'
// import { AdminRouter } from './routes/admin.routes'

// Middleware that parses json -> transforma en json cualqueir peticion tipo json
app.use(express.json());

// Middleware para usar router
app.use('/users', UserRouter); // EL POST SE TIENE QUE HACER A ESA RUTA /Users
// app.use('/admins', AdminRouter); 
// app.use('/patients/appointments', PatientRouter); // EL POST SE TIENE QUE HACER A ESA RUTA /Users

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app; // para poderla importar fuera