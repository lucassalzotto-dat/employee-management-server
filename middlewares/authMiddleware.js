// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token de los headers
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verificar el token y agregar los datos del usuario al request
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Asegúrate de que el token contenga el rol y otros datos necesarios
    next();
  } catch (error) {
    res.status(401).json({ error: "Token no válido" });
  }
};
