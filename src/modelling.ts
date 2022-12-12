type address = string;
type phone = number;
type day = number;
type month = string;
type year = number;
type adm = 1;
type dr = 2;
type px = 3;

// User 
interface User {
    user_id: number, // PK
    role_id: 1 | 2 | 3, // admin, doctor, patient
    first_name: string,
    last_name: string,
    sex: "male" | "female",
    birthday: Date, // string ("yyyy-mm-dd") // [day, month, year], 
    username: string,
    passwd: string,
    email: string,
    contact: [address, phone], 
    creation_date: Date,
    is_deleted: boolean,
}

const yo: User = {
    user_id: 1,
    role_id: 3,
    first_name: "Dannaé",
    last_name: "Díaz",
    sex: "female",
    username: "@dannaediaz",
    passwd: "********",
    email: "dannaeaxtle@hotmail.com",
    birthday:  new Date("1998-06-20"), // ("yyyy-mm-dd") // [20, "June", 1998],
    contact: ["C.3 x 4 y 6 San Antonio Cinta", 9991936111],
    creation_date: new Date("2022-12-11"),
    is_deleted: false,
}


// Patient
interface Patient {
    patient_id: number, // FK to user
    // role_id: 3, // FK to user
    ss_num: number | null, // ss_num?: number, // check for having ss
    weight: number,
    height: number,
    has_appointment: boolean,
    appointment_id?: number, // number | null // FK to appointment 
    risk_factors: string[],
    food_alergies: string[],
    med_alergies: string[],
    covid_vaccine: boolean,
}

// Doctor
interface Doctor {
    doctor_id: number, // FK to user
    // role_id: 2, // FK to user
    university: string,
    graduation_year: number,
    license: number, // check for having professional license
    specialty_id: number, // FK to specialty, to match with its department 
    appointments_today: number, 
    covid_vaccine: boolean,
}

// Admin
interface Admin {
    admin_id: number, // FK to user
    // role_id: 1, // FK to user
    description: string, 
}

// Message 
interface Message {
    message_id: number,
    creation_date: Date, // ("yyyy-mm-dd") // [day,month,year],
    creation_time: number[], // hr min sec
    from: number, // user id 
    to: number, // user id 
    body: string,
}

// Specialty 
interface Specialty {
    specialty_id: number,
    specialty_name: string,
    years_of_exp: number,
    sub_specialty: string,
}

// Role 
interface Role {
    id: adm | dr | px, 
    name: string, // administrator, doctor, patient
}

// Appointment
interface Appointment{
    appointment_id: number, 
    patient_id: number, // FK to patient
    doctor_id: number, // FK to doctor
    date: Date, // ("yyyy-mm-dd") // [day, month, year],
    time: number[], // in 24 hr format [hour, min, sec]
    consulting_room: number,
    cost: number,
    description: string,
    is_deleted: boolean,
}