const { Schedule, Employee } = require('../models');

// Obtener horarios de todos los empleados (solo para admin)
exports.getSchedules = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const schedules = await Schedule.findAll({
      include: [{ model: Employee, as: 'employee' }]
    });
    
    const formattedSchedules = schedules.map(schedule => {
      const formattedSchedule = {
        ...schedule.toJSON(),
        hora_inicio: schedule.hora_inicio.slice(0, 5), // HH:MM
        hora_fin: schedule.hora_fin.slice(0, 5)        // HH:MM
      };
      return formattedSchedule;
    });

    res.json(formattedSchedules);
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    res.status(500).json({ error: "Error al obtener horarios" });
  }
};

// Asignar un horario a un empleado (solo para admin)
exports.createSchedule = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id_empleado, fecha, hora_inicio, hora_fin } = req.body;
    const newSchedule = await Schedule.create({ id_empleado, fecha, hora_inicio, hora_fin });
    res.status(201).json({ message: "Horario asignado correctamente", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ error: "Error al asignar horario" });
  }
};

// Actualizar horario de un empleado (solo para admin)
exports.updateSchedule = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const { fecha, hora_inicio, hora_fin } = req.body;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) return res.status(404).json({ error: "Horario no encontrado" });

    await schedule.update({ fecha, hora_inicio, hora_fin });
    res.json({ message: "Horario actualizado correctamente", schedule });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar horario" });
  }
};

// Eliminar un horario (solo para admin)
exports.deleteSchedule = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) return res.status(404).json({ error: "Horario no encontrado" });

    await schedule.destroy();
    res.json({ message: "Horario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar horario" });
  }
};
