// src/routes/scheduleRequestRoutes.js
const express = require('express');
const router = express.Router();
const scheduleRequestController = require('../controllers/scheduleRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear una nueva solicitud de cambio de horario (empleado)
router.post('/create', authMiddleware, scheduleRequestController.createScheduleRequest);

// Obtener todas las solicitudes de cambio de horario (admin)
router.get('/all', authMiddleware, scheduleRequestController.getAllScheduleRequests);

// Aprobar o rechazar una solicitud de cambio de horario (admin)
router.put('/:id/status', authMiddleware, scheduleRequestController.updateScheduleRequestStatus);

module.exports = router;
