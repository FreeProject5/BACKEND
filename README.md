# Administración de citas médicas

Se ha realizado una aplicación web para administrar citas médicas online la cual consta de 2 partes:

- Backend -> [REST API citas médicas](https://citas-medicas-nu.vercel.app/api/v1/)
- Frontend -> [App citas médicas](https://app-citas-medicas.vercel.app/)  -  [Repositorio](https://github.com/FreeProject5/Project_frontend)
   

Este repositorio contiene el código backend del proyecto con el que se puede realizar múltiples tareas como gestionar datos, autenticación, y procesamiento de solicitudes de:

1. Pacientes. 🙋🏻‍♂️🙋🏻‍♀️
2. Doctores. 🧑🏻‍⚕️
3. Citas médicas. 🕞
4. Especialidades. 🩺
5. Horarios médicos. 📅

## Instalación y configuración 🛠️

- Instalar las depedencias del proyecto
  ```bash
  npm install
  ```

#### **Supabase** 💾

Se ha implementado [Supabase](https://app.supabase.com/sign-in) como base de datos online, por lo tanto se requiere:

- Crear un proyecto en su web.
- Configurar las tablas de la BD y establecer _RLS disabled_.
- Copiar los valores de PROJECT_URL y API_KEY para usar en nuestro proyecto.

#### **Variables de entorno** 🔑

- Configurar las variables de entorno en el archivo `.env` en la raíz del proyecto con los parámetros:

  ```node
  SUPABASE_PROJECT_URL = "https://link-de-ejemplo.supabase.co";
  SUPABASE_API_KEY = "mykeysupabaseproject";
  SECRET_KEY = "mysecretkey";
  ACCOUNT_SID = "twilioaccountsid";
  AUTH_TOKEN= "twilioauthtoken";
  ```

  Se recomienda encriptar el valor de `SECRET_KEY` con la función **crypto** de Node.

  Ingresar al CLI de Node en el terminal

  ```bash
   node
  ```

  Ejecutar

  ```bash
  require("crypto").randomBytes(64).toString("hex")
  ```

  Esto nos dará una clave la cual usaremos como `SECRET_KEY`

### **Instalación y configuración de JEST**

`npm i jest -D`

- En package.json scripts poner jest

`npm i --save-dev @types/jest`

#### jest solo me permite usar require, entonces para poder usar import ,usaré este comando:

`npm install --save-dev babel-jest @babel/core @babel/preset-env`

#### Para usar typescript 

`npm install --save-dev @babel/preset-typescript`         

`npm i ts-jest -D`

#### Aquí se instala el coverage dependiendo de la configuración cuando ejecutemos el siguiente comando. También se configura jest

`npx jest --init`

### **Ejecutar el proyecto**

```bash
npm run dev
```

## Funcionamiento

> _Hay rutas protegidas con middleware que requieren enviar un token de verificacion en el **Headers**, el cual se obtiene al momento de hacer login de un usuario._

### Pacientes 🙋🏻‍♂️🙋🏻‍♀️

- Para crear usuarios pacientes enviar los datos en el body con formato JSON. De la misma manera se envia algunos o todos los datos del usuario que desea actualizarlos al endpoint correspondiente.

  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "phone": "987654321",
    "age": 30,
    "email": "johndoe@gmail.com",
    "password": "12345678"
  }
  ```

- Endpoints

  1. <http://localhost:6005/api/v1/patient> --> _Crear usuarios pacientes (POST) ✔️_

  2. <http://localhost:6005/api/v1/patient/login> --> _Login de usuarios, enviar email y password (POST)_ ✔️

     > Esto genera un token que se usará para acceder a las rutas protegidas

  3. <http://localhost:6005/api/v1/patient> --> _Obtener todos los usuarios (GET)_ 🗒️

  4. <http://localhost:6005/api/v1/patient/id> --> _Obtener un usuario por id enviando el token (GET)_ 🗒️

  5. <http://localhost:6005/api/v1/patient/id> --> _Actualizar usuario por id enviando el token (PUT)_ 🔃

  6. <http://localhost:6005/api/v1/patient/id> --> _Eliminar un usuario por id enviando el token (DELETE)_ ❌


### Doctores 🧑🏻‍⚕️

- Para crear usuarios doctores enviar los datos en el body con formato JSON. De la misma manera se envia algunos o todos los datos del doctor que desea actualizarlos al endpoint correspondiente.

  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@gmail.com",
    "password": "12345678"
  }
  ```

- Endpoints

  1. <http://localhost:6005/api/v1/doctor> --> _Crear usuarios doctores (POST) ✔️_

  2. <http://localhost:6005/api/v1/doctor/login_doctor> --> _Login de doctores, enviar email y password (POST)_ ✔️

     > Esto genera un token que se usará para acceder a las rutas protegidas

  3. <http://localhost:6005/api/v1/doctor> --> _Obtener todos los doctores (GET)_ 🗒️

  4. <http://localhost:6005/api/v1/doctor/id> --> _Obtener un doctor por id (GET)_ 🗒️

  5. <http://localhost:6005/api/v1/patient/id> --> _Actualizar doctor por id enviando el token (PUT)_ 🔃

  6. <http://localhost:6005/api/v1/patient/id> --> _Eliminar un doctor por id enviando el token (DELETE)_ ❌


### Citas médicas 🕞

- Para crear citas médicas enviar los datos en el body con formato JSON. De la misma manera se envia algunos o todos los datos de la cita que que se quiere actualizar al endpoint correspondiente.

  ```json
  {
    "id_patient": 1,
    "id_specialtie": 2,
    "id_doctor": 4,
    "id_schedule": 3,
    "checkup_date": "aaaa-mm-dd",
    "checkup_time": "hh:mm:ss"
  }
  ```

- Endpoints

  1. <http://localhost:6005/api/v1/checkup> --> _Crear citas médicas (POST) ✔️_

  2. <http://localhost:6005/api/v1/checkup> --> _Obtener todas las citas médicas (POST)_ ✔️

  3. <http://localhost:6005/api/v1/checkup/id> --> _Actualizar doctor por id enviando el token (PUT)_ 🔃

  4. <http://localhost:6005/api/v1/checkup/id> --> _Eliminar un doctor por id enviando el token (DELETE)_ ❌

  5. <http://localhost:6005/api/v1/checkup/bypatient/id> --> _Obtener citas médicas de un paciente por id (GET)_ 🗒️

  6. <http://localhost:6005/api/v1/checkup/bydoctor/id> --> _Obtener citas médicas programadas de un doctor por id (GET)_ 🗒️

  7. <http://localhost:6005/api/v1/checkup/data> --> _Obtener citas médicas programadas de un doctor por id (GET)_ 🗒️


### Especialidades 🩺

- Para crear especialidades enviar los datos en el body con formato JSON. De la misma manera se envia algunos o todos los datos de la especialidad que que se quiere actualizar al endpoint correspondiente.

  ```json
  {
    "name": "Cardiología"
  }
  ```

- Endpoints

  1. <http://localhost:6005/api/v1/specialties> --> _Crear especialidades (POST) ✔️_

  2. <http://localhost:6005/api/v1/specialties> --> _Obtener todas las especialidades (GET)_ ✔️

  3. <http://localhost:6005/api/v1/specialties/id> --> _Eliminar una especialidad por id (DELETE)_ ❌

  4. <http://localhost:6005/api/v1/specialties/update/id> --> _Actualizar una especialidad por id (PUT)_ 🗒️

  5. <http://localhost:6005/api/v1/specialties/byspecialty/id> --> _Obtener doctores por especialidad (GET)_ 🗒️


### Horarios médicos 📅

- Para crear horarios médicos enviar los datos en el body con formato JSON.

  ```json
  {
    "id_doctor": 1,
    "date": "2023-02-06",
    "start_time": "09:00:00-05",
    "end_time": "16:00:00-05",
  }
  ```

- Endpoints

  1. <http://localhost:6005/api/v1/doctor/RegistrationHorario> --> _Crear horarios médicos (POST) ✔️_

  2. <http://localhost:6005/api/v1/doctor/findAll/Schedule> --> _Obtener todos los horarios médicos (GET)_ ✔️

  3. <http://localhost:6005/api/v1/doctor/findAll_schedule/id> --> _Obtener un horario médico por id (GET)_ 🗒️



