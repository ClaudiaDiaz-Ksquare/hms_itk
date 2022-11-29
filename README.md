# hms_itk
Project ITK

### User
Conatins basic information about all users.

- Id
- FirstName
- LastName
- UserName
- Password
- Address
- Cellphone
- Mail
- CreatedDate
- is_deleted
- id_role

### Patient
Contains the patient's information.

- Id (Foreing Key to USER)
- Social segurity Number

### Doctor 
Contains the doctor's information.

- Id (Foreing Key to USER)
- Professional license 
- Id_Specialty (Foreing Key to Specialty)

### Admin
Contains the admin information. The admin has the power to create new doctors.

- Id (Foreing Key to USER)
- Description

### Specialty
Contains the names of the Doctor's specializations.

- Id
- Description

### Appointment
Contains the appointment's information.

- Id
- Date
- Id_patient
- Id_doctor
- Description

### Role
Contains the three types of roles available.

- Id
- Name

### Message
Contains the message's body sent throgh the platform.

- Id
- CreatedDate
- From (mail)
- To (Admin)
- Body