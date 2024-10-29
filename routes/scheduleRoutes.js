// src/routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para que el empleado obtenga su propio horario
router.get('/employee/:id_empleado', authMiddleware, scheduleController.getScheduleByEmployee);

// Ruta para que el administrador obtenga todos los horarios
router.get('/all', authMiddleware, scheduleController.getAllSchedules);

// Ruta para asignar un horario a un empleado (solo admin)
router.post('/assign', authMiddleware, scheduleController.createSchedule);

// Ruta para que el administrador actualice el horario de un empleado (solo admin)
router.put('/:id', authMiddleware, scheduleController.updateSchedule);

module.exports = router;
