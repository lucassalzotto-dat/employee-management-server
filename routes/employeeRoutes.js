// src/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/all', authMiddleware, employeeController.getEmployees); // Cambiado a '/all' para listar todos
router.post('/', authMiddleware, employeeController.createEmployee);
router.put('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);
router.get('/employees-with-schedules', authMiddleware, employeeController.getEmployeesWithSchedules);

module.exports = router;
