// src/controllers/scheduleController.js
const { Schedule, Employee, User } = require('../models');

// Asignar un nuevo horario a un empleado (solo admin)
exports.createSchedule = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id_empleado, fecha, hora_inicio, hora_fin } = req.body;

    // Verificar que el empleado exista
    const employee = await Employee.findByPk(id_empleado);
    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Crear el nuevo horario
    const newSchedule = await Schedule.create({
      id_empleado,
      fecha,
      hora_inicio,
      hora_fin
    });

    res.status(201).json({ message: "Horario asignado correctamente", schedule: newSchedule });
  } catch (error) {
    console.error("Error al asignar horario:", error);
    res.status(500).json({ error: "Error al asignar horario" });
  }
};

// Obtener el horario de un empleado específico
exports.getScheduleByEmployee = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const schedule = await Schedule.findOne({
      where: { id_empleado },
      include: [{ model: Employee, as: 'employee', attributes: ['nombre', 'correo', 'posicion'] }]
    });

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado para el empleado" });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Error al obtener el horario:", error);
    res.status(500).json({ error: "Error al obtener el horario" });
  }
};

// Obtener todos los horarios (solo para admin)
exports.getAllSchedules = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const schedules = await Schedule.findAll({
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['nombre', 'posicion'], // Quitar `correo`
          include: {
            model: User,
            as: 'user',
            attributes: ['correo'] // Agregar `correo` desde el modelo `User`
          }
        }
      ]
    });
    res.json(schedules);
  } catch (error) {
    console.error("Error al obtener todos los horarios:", error);
    res.status(500).json({ error: "Error al obtener los horarios" });
  }
};

// Actualizar el horario de un empleado (solo admin)
exports.updateSchedule = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params; // ID del horario a actualizar
    const { fecha, hora_inicio, hora_fin } = req.body;

    // Buscar el horario por ID
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }

    // Actualizar el horario con los nuevos datos
    await schedule.update({
      fecha,
      hora_inicio,
      hora_fin
    });

    res.json({ message: "Horario actualizado correctamente", schedule });
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    res.status(500).json({ error: "Error al actualizar el horario" });
  }
};

exports.getScheduleByEmployee = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const schedule = await Schedule.findOne({
      where: { id_empleado },
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['nombre', 'posicion']
        }
      ]
    });

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado para el empleado" });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Error al obtener el horario:", error);
    res.status(500).json({ error: "Error al obtener el horario" });
  }
};
