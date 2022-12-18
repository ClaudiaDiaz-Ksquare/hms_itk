# hms_itk
Project ITK Health Management System


### Role
Contains the three types of roles available for each existent user.

| Property | Type        | Reference     | Comment                      |
|----------|-------------|---------------|------------------------------|
| id       | varchar(50) | PK - Not null |                              |
| title    | varchar(10) |    Not null   | "admin", "doctor", "patient" |


### User
Contains basic information about all users.

| Property   | Type        | Reference      | Comment               |
|------------|-------------|----------------|-----------------------|
| id         | varchar(50) |  PK - Not null |                       |
| role_id    |     int     |  FK - Not null | 1(admn), 2(dr), 3(px) |
| first_name | varchar(40) |     Not null   |                       |
| last_name  | varchar(40) |     Not null   |                       |
| email      | varchar(40) |     Not null   |                       |
| passwd     | varchar(40) |     Not null   |                       |
| is_active  |   Boolean   |                |     default: true     |


### Patient
Contains the patient's information.

| Property          | Type        | Reference     | Comment            |
|-------------------|-------------|---------------|--------------------|
| id                | varchar(50) | PK - Not null |                    |
| user_id           | varchar(50) | FK - Not null |                    |
| ss_num            |     int     |    Not null   |   Social Security  |
| sex               | varchar(10) |    Not null   | "male" or "female" |
| birthday          |     Date    |    Not null   |                    |
| phone             |     int     |    Not null   |                    |
| appointment_id    | varchar(50) | FK - Not null |                    |
| has_covid_vaccine |   Boolean   |               |                    |
| risk_factors      |varchar(150) |               |    i.e. "Diabetes" |


### Admin
Contains the admin's information. The admin has the power to create new doctors.

| Property    | Type         | Reference     | Comment |
|-------------|--------------|---------------|---------|
| id          |  varchar(50) | PK - Not null |         |
| user_id     |  varchar(50) | FK - Not null |         |
| description | varchar(150) |               |         |


### Doctor 
Contains the doctor's information.

| Property          | Type        | Reference     | Comment           |
|-------------------|-------------|---------------|-------------------|
| id                | varchar(50) | PK - Not null |                   |
| user_id           | varchar(50) | FK - Not null |                   |
| university        | varchar(80) |    Not null   |                   |
| graduation_year   |     int     |               |                   |
| license_num       |     int     |    Not null   |                   |
| specialty_id      | varchar(50) | FK - Not null |                   |
| phone             |     int     |    Not null   |                   |
| consulting_room   |     int     |    Not null   |                   |


### Specialty
Contains the names of the Doctor's specializations.

| Property | Type        | Reference     | Comment           |
|----------|-------------|---------------|-------------------|
| id       | varchar(50) | PK - Not null |                   |
| name     | varchar(40) |    Not null   | i.e. "Pediatrics" |


### Appointment
Contains the appointment's information.

| Property     | Type         | Reference     | Comment        |
|--------------|--------------|---------------|----------------|
| id           |  varchar(50) | PK - Not null |                |
| patient_id   |  varchar(50) | FK - Not null |                |
| doctor_id    |  varchar(50) | FK - Not null |                |
| date_time    |     Date     |    Not null   |                |
| cost         |      int     |    Not null   |                |
| description  | varchar(150) |               |                |
| is_cancelled |    Boolean   |               | default: false |


### Message
Contains the message's body sent throgh the platform.

| Property | Type         | Reference     | Comment |
|----------|--------------|---------------|---------|
| id       |  varchar(50) | PK - Not null |         |
| from     |  varchar(50) | FK - Not null |         |
| to       |  varchar(50) | FK - Not null |         |
| body     | varchar(150) |    Not null   |         |
