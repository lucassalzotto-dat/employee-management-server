// models/Employee.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // Relación: un empleado pertenece a un usuario
      Employee.belongsTo(models.User, { foreignKey: 'id_usuario', as: 'user' });
      
      // Relación: un empleado tiene un solo horario
      Employee.hasOne(models.Schedule, { foreignKey: 'id_empleado', as: 'schedule' });
    }
  }
  Employee.init(
    {
      nombre: DataTypes.STRING,
      posicion: DataTypes.STRING,
      fecha_contratacion: DataTypes.DATE,
      estado: DataTypes.BOOLEAN,
      id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  );
  return Employee;
};
