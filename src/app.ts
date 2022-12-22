// Configuración de express (conectar routers, middlewares, etc)

import express, { Application, Request, Response } from 'express';

const app: Application = express(); // para el servidor

// Importar routers
import { UserRouter } from './routes/user.routes'
import { PatientRouter } from './routes/patient.routes'
import { DoctorRouter } from './routes/doctor.routes'
// import { AdminRouter } from './routes/admin.routes'
import { AppointmentRouter } from './routes/appointment.routes'

// Middleware that parses json -> transforma en json cualqueir peticion tipo json
app.use(express.json());

// Middleware para usar router
app.use('/users', UserRouter); 
app.use('/patients', PatientRouter); 
// app.use('/admins', AdminRouter); 
app.use('/doctors', DoctorRouter); 
app.use('/appointments', AppointmentRouter); 

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app; // para poderla importar fuera