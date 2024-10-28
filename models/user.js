// models/User.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación: un usuario tiene muchos empleados
      User.hasMany(models.Employee, { foreignKey: 'id_usuario', as: 'employees' });
    }
  }
  User.init(
    {
      nombre: DataTypes.STRING,
      correo: DataTypes.STRING,
      contraseña: DataTypes.STRING,
      rol: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
