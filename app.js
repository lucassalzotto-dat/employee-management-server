const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Configuración de variables de entorno
dotenv.config();

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3001', // Cambia esto a la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());

// Importar middlewares y rutas
const authMiddleware = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const scheduleRequestRoutes = require('./routes/scheduleRequestRoutes');

// Configuración de las rutas
app.use('/users', userRoutes);
app.use('/employees', authMiddleware, employeeRoutes);
app.use('/schedules', authMiddleware, scheduleRoutes);
app.use('/schedule_requests', authMiddleware, scheduleRequestRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Configuración del puerto y inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
