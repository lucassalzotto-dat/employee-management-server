// src/controllers/scheduleRequestController.js
const { ScheduleRequest, Schedule, Employee } = require('../models');

// Crear una nueva solicitud de cambio de horario (empleado)
exports.createScheduleRequest = async (req, res) => {
  try {
    const { id_empleado, fecha_solicitada, nueva_hora_inicio, nueva_hora_fin } = req.body;

    const newRequest = await ScheduleRequest.create({
      id_empleado,
      fecha_solicitada,
      nueva_hora_inicio,
      nueva_hora_fin,
      estado: 'pendiente' // Estado inicial de la solicitud
    });

    res.status(201).json({ message: "Solicitud de cambio de horario creada", request: newRequest });
  } catch (error) {
    console.error("Error al crear solicitud de cambio:", error);
    res.status(500).json({ error: "Error al crear la solicitud" });
  }
};


// Obtener todas las solicitudes de cambio de horario (solo para admin)
exports.getAllScheduleRequests = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const requests = await ScheduleRequest.findAll({
      include: [{ model: Employee, as: 'employee', attributes: ['nombre', 'posicion'] }]
    });
    res.json(requests);
  } catch (error) {
    console.error("Error al obtener las solicitudes de cambio de horario:", error);
    res.status(500).json({ error: "Error al obtener las solicitudes" });
  }
};

// Aprobar o rechazar una solicitud de cambio de horario (solo para admin)
exports.updateScheduleRequestStatus = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const { estado } = req.body; // 'aprobada' o 'rechazada'
    const request = await ScheduleRequest.findByPk(id);

    if (!request) return res.status(404).json({ error: "Solicitud no encontrada" });

    // Si se aprueba la solicitud, actualiza el horario del empleado
    if (estado === 'aprobada') {
      await Schedule.upsert({
        id_empleado: request.id_empleado,
        fecha: request.fecha_solicitada,
        hora_inicio: request.nueva_hora_inicio,
        hora_fin: request.nueva_hora_fin
      });
    }

    // Actualiza el estado de la solicitud
    await request.update({ estado });
    res.json({ message: `Solicitud ${estado} exitosamente` });
  } catch (error) {
    console.error("Error al actualizar el estado de la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};