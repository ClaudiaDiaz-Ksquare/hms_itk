// import { Appointment } from "./appointment.model";
// import { Doctor } from "./doctor.model";
// import { Patient } from "./patient.model";
// import { User } from "./user.model";

// // * Doctor
// Doctor.hasMany(Appointment, {
//     foreignKey: 'id',
//     sourceKey: 'doctor_id',
// });
// Doctor.belongsTo(Appointment, {
//     foreignKey: 'doctor_id',
// })

// // * Appointment
// Appointment.hasOne(Patient, {
//     foreignKey: 'patient_id',
//     sourceKey: 'id',
// })

// Appointment.hasOne(Doctor, {
//     foreignKey: 'doctor_id',
//     sourceKey: 'id',
// })

// // * Patient

// Patient.hasMany(Appointment, {
//     foreignKey: 'id',
//     sourceKey: 'patient_id',
// });
