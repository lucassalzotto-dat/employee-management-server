# Servidor de Gestión de Empleados

API backend para el Sistema de Gestión de Empleados, que proporciona endpoints para la gestión de empleados, horarios y solicitudes de cambio de horario. Este proyecto está construido con Node.js, Express y Sequelize, utilizando MySQL como base de datos.

## Estructura del Proyecto

```
employee-management-server/
├── controllers/          # Controladores para manejar la lógica de la API
├── middlewares/          # Middlewares para autenticación, manejo de errores, etc.
├── models/               # Modelos de Sequelize y sus relaciones
├── routes/               # Definición de rutas de la API
├── migrations/           # Migraciones de la base de datos
├── config/               # Configuración de la base de datos
└── app.js                # Archivo principal de la aplicación
```

## Tecnologías

- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web para construir la API REST
- **Sequelize**: ORM para manejar interacciones con MySQL
- **MySQL**: Base de datos relacional para almacenar datos de empleados
- **JWT**: Tokens de autenticación para la autenticación de usuarios

## Inicio Rápido

### Requisitos

Asegúrate de tener instalados Node.js y MySQL.

### Instalación

1. Clona el repositorio:
   ```bash
   https://github.com/lucassalzotto-dat/employee-management-server.git
   cd employee-management-server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (ver [Variables de Entorno](#variables-de-entorno)).

4. Ejecuta las migraciones de la base de datos para configurar el esquema:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicia el servidor:
   ```bash
   NODE_ENV=development npm start
   ```

   El servidor debería estar corriendo en `http://localhost:3000`.

## Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```env
PORT=3000
DB_NAME=prueba_db
DB_USER=example_user
DB_PASS=example_pass
DB_HOST=example_host
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=tu_jwt_secreto
```

## Migraciones de Base de Datos

Para aplicar las migraciones, ejecuta:
```bash
npx sequelize-cli db:migrate
```

Para deshacer la última migración:
```bash
npx sequelize-cli db:migrate:undo
```

## Endpoints de la API

### Endpoints de Usuarios

- **POST /users/register**: Registrar un nuevo usuario (admin o empleado).
- **POST /users/login**: Iniciar sesión y recibir un token JWT.

### Endpoints de Empleados

- **GET /employees/all**: Obtener una lista de todos los empleados (solo admin).
- **POST /employees**: Agregar un nuevo empleado (solo admin).
- **PUT /employees/:id**: Actualizar un empleado existente (solo admin).
- **DELETE /employees/:id**: Eliminar un empleado (solo admin).
- **GET /employees/employees-with-schedules**: Obtener empleados con sus horarios asignados (solo admin).

### Endpoints de Horarios

- **POST /schedules/assign**: Asignar un horario a un empleado (solo admin).
- **GET /schedules/employee/:id_empleado**: Obtener el horario de un empleado.
- **GET /schedules/all**: Obtener todos los horarios (solo admin).
- **PUT /schedules/:id**: Actualizar un horario existente (solo admin).

### Endpoints de Solicitudes de Cambio

- **POST /schedule-requests**: Solicitar un cambio de horario (empleado).
- **GET /schedule-requests/all**: Obtener todas las solicitudes de cambio de horario (solo admin).
- **PUT /schedule-requests/:id**: Aprobar o rechazar una solicitud de cambio de horario (solo admin).

## Pruebas con Postman

Para probar esta API con Postman:

1. Configura las variables de entorno en Postman para que coincidan con tu archivo `.env`.
2. Usa los endpoints definidos anteriormente para crear usuarios, empleados, horarios y gestionar solicitudes de cambio.
3. Puedes autenticarte incluyendo el token JWT en el encabezado `Authorization` como `Bearer <token>`.



## Licencia

Lucas Salzotto & Valentin Hildmann