# hms_itk
Project ITK Health Management System

### User
Conatins basic information about all users.

- user_id (Primary Key)
- role_id (Foreign Key to Role)
- first_name
- last_name
- sex
- birthday
- username
- passwd
- email
- contact
- creation_date
- is_deleted

### Patient
Contains the patient's information.

- patient_id (Foreing Key to USER)
- ss_num
- weight
- height
- has_appointment
- appointment_id (Foreing Key to Appointment)
- risk_factors
- food_alergies
- med_alergies
- covid_vaccine

### Doctor 
Contains the doctor's information.

- doctor_id (Foreing Key to USER)
- university
- graduation_year
- license
- specialty_id (Foreing Key to Specialty)
- appointments_today
- covid_vaccine

### Admin
Contains the admin's information. The admin has the power to create new doctors.

- admin_id (Foreing Key to USER)
- description

### Specialty
Contains the names of the Doctor's specializations.

- specialty_id 
- specialty_name
- years_of_exp
- sub_specialty

### Appointment
Contains the appointment's information.

- appointment_id
- patient_id (Foreing Key to Patient)
- doctor_id (Foreing Key to Doctor)
- date
- time
- consulting_room
- cost
- description
- is_deleted

### Role
Contains the three types of roles available for each existent user.

- id (1: admin, 2: doctor, 3: patient)
- name

### Message
Contains the message's body sent throgh the platform.

- message_id 
- creation_date
- creation_time
- from (Foreing Key to USER ID)
- to (Foreing Key to USER ID)
- body