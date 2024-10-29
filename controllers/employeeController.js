const { Employee, User } = require('../models');
const { Schedule } = require('../models');

exports.getEmployees = async (req, res) => {
  // Validar si el usuario es administrador
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: "Acceso denegado: solo los administradores pueden ver la lista de empleados" });
  }

  try {
    const { count, rows: employees } = await Employee.findAndCountAll({
      include: [{ model: User, as: 'user', attributes: ['nombre', 'correo'] }]
    });
    
    res.json({ total: count, employees });
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error al obtener empleados" });
  }
};


// Registrar un nuevo empleado (solo para admin)
exports.createEmployee = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { nombre, posicion, fecha_contratacion, estado, id_usuario } = req.body;
    const newEmployee = await Employee.create({ nombre, posicion, fecha_contratacion, estado, id_usuario });
    res.status(201).json(newEmployee); // Retorna el objeto completo del empleado, incluyendo el id
  } catch (error) {
    console.error("Error al registrar empleado:", error); // Para depuración
    res.status(500).json({ error: "Error al registrar empleado" });
  }
};


// Actualizar la información de un empleado (solo para admin)
exports.updateEmployee = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const { nombre, posicion, fecha_contratacion, estado } = req.body;
    const employee = await Employee.findByPk(id);

    if (!employee) return res.status(404).json({ error: "Empleado no encontrado" });

    await employee.update({ nombre, posicion, fecha_contratacion, estado });
    res.json({ message: "Empleado actualizado correctamente", employee });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
};

// Eliminar un empleado (solo para admin), incluyendo sus horarios
exports.deleteEmployee = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) return res.status(404).json({ error: "Empleado no encontrado" });

    // Eliminar los horarios asociados al empleado antes de eliminar el empleado
    await Schedule.destroy({ where: { id_empleado: id } });
    await employee.destroy();

    res.json({ message: "Empleado y sus horarios eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar empleado" });
  }
};

exports.getEmployeesWithSchedules = async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: "Acceso denegado" });

  try {
    const employees = await Employee.findAll({
      include: [{ model: Schedule, as: 'schedule' }] // Incluye el horario asociado
    });
    res.json(employees);
  } catch (error) {
    console.error("Error al obtener empleados con horarios:", error);
    res.status(500).json({ error: "Error al obtener empleados con horarios" });
  }
};