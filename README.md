# hms_itk
Project ITK Health Management System


### User
Contains basic information about all users.

| Property   | Type        | Reference      | Comment                      |
|------------|-------------|----------------|------------------------------|
| id         | varchar(50) |  PK - Not null |                              |
| role       | varchar(10) |  FK - Not null | "admin", "doctor", "patient" |
| full_name  | varchar(40) |     Not null   |                              |
| email      | varchar(40) |     Not null   |                              |
| passwd     | varchar(40) |     Not null   |                              |
| is_active  |   Boolean   |                |         default: true        |


### Patient
Contains the patient's information.

| Property          | Type        | Reference     | Comment            |
|-------------------|-------------|---------------|--------------------|
| id                | varchar(50) | PK - Not null |                    |
| user_id           | varchar(50) | FK - Not null |                    |
| ss_num            |     int     |               |   Social Security  |
| sex               | varchar(10) |    Not null   | "male" or "female" |
| birthday          |     Date    |    Not null   |                    |
| phone             |     int     |               |                    |
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

| Property         | Type        | Reference     | Comment           |
|----------------- |-------------|---------------|-------------------|
| id               | varchar(50) | PK - Not null |                   |
| user_id          | varchar(50) | FK - Not null |                   |
| university       | varchar(80) |    Not null   |                   |
| graduation_year  |     int     |               |                   |
| license_num      |     int     |    Not null   |                   |
| specialty_id     | varchar(50) | FK - Not null |                   |
| phone            |     int     |               |                   |
| consulting_room  |     int     |               |                   |


### Specialty
Contains the names of the Doctor's specializations.

| Property | Type        | Reference                    | Comment           |
|----------|-------------|------------------------------|-------------------|
| id       |     int     | PK - Not null - Autoincrement|                   |
| name     | varchar(40) |           Not null           | i.e. "Pediatrics" |


### Appointment
Contains the appointment's information.

| Property     | Type         | Reference                     | Comment        |
|--------------|--------------|-------------------------------|----------------|
| id           |      int     | PK - Not null - Autoincrement |                |
| patient_id   |  varchar(50) |         FK - Not null         |                |
| doctor_id    |  varchar(50) |         FK - Not null         |                |
| date_time    |     Date     |            Not null           |                |
| description  | varchar(150) |                               |                |
| is_cancelled |    Boolean   |                               | default: false |


### Message
Contains the message's body sent throgh the platform.

| Property  | Type         | Reference                    | Comment |
|-----------|--------------|------------------------------|---------|
| id        |      int     | PK - Not null - Autoincrement|         |
| from_user |  varchar(50) |         FK - Not null        |         |
| to_user   |  varchar(50) |         FK - Not null        |         |
| body      | varchar(150) |           Not nulll          |         |
