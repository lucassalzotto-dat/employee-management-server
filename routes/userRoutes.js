// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas de usuario
router.post('/register', userController.register);
router.post('/register-employee', authMiddleware, userController.registerEmployee); // Protege la ruta con authMiddleware
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;
