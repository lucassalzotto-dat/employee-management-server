const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importa el modelo de Usuario

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
