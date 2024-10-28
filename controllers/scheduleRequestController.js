const { ScheduleRequest } = require('../models');

// Crear una solicitud de cambio de horario (empleado)
exports.createScheduleRequest = async (req, res) => {
  try {
    const { id_empleado, fecha_solicitada, nueva_hora_inicio, nueva_hora_fin } = req.body;
    const newRequest = await ScheduleRequest.create({
      id_empleado,
      fecha_solicitada,
      nueva_hora_inicio,
      nueva_hora_fin,
      estado: 'pendiente'
    });
    res.status(201).json({ message: "Solicitud de cambio de horario creada", request: newRequest });
  } catch (error) {
    res.status(500).json({ error: "Error al crear solicitud" });
  }
};

// Obtener todas las solicitudes de cambio de horario (solo para admin)
exports.getScheduleRequests = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const requests = await ScheduleRequest.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
};

// Aprobar o rechazar una solicitud de cambio (solo para admin)
exports.updateScheduleRequestStatus = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const { estado } = req.body;
    const request = await ScheduleRequest.findByPk(id);

    if (!request) return res.status(404).json({ error: "Solicitud no encontrada" });

    await request.update({ estado });
    res.json({ message: "Estado de la solicitud actualizado", request });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar solicitud" });
  }
};
