const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Employee } = require('../models'); // Importa los modelos de Usuario y Empleado

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newUser = await User.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol
    });
    res.status(201).json({ message: "Usuario registrado correctamente", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};


// Registrar un nuevo usuario del tipo empleado y su correspondiente empleado (solo para admin)
exports.registerEmployee = async (req, res) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: "Acceso denegado: solo los administradores pueden crear empleados" });
  }

  try {
    const { nombre, correo, contraseña, posicion, fecha_contratacion, estado } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear el usuario con el rol 'empleado'
    const newUser = await User.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol: 'empleado',
    });

    // Crear el empleado con el mismo ID que el usuario
    const newEmployee = await Employee.create({
      id: newUser.id,
      nombre,
      posicion,
      fecha_contratacion,
      estado,
      id_usuario: newUser.id,
    });

    res.status(201).json({ message: "Usuario y empleado registrados correctamente", user: newUser, employee: newEmployee });
  } catch (error) {
    console.error("Error al registrar usuario y empleado:", error);
    res.status(500).json({ error: "Error al registrar usuario y empleado" });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await User.findOne({ where: { correo } });
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Autenticación exitosa", token });
  } catch (error) {
    res.status(500).json({ error: "Error en autenticación" });
  }
};

// Función para obtener el perfil del usuario autenticado
exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'nombre', 'correo', 'rol'] });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};
