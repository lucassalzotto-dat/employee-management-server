// src/models/ScheduleRequest.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScheduleRequest extends Model {
    static associate(models) {
      ScheduleRequest.belongsTo(models.Employee, { foreignKey: 'id_empleado', as: 'employee' });
    }
  }

  ScheduleRequest.init({
    id_empleado: DataTypes.INTEGER,
    fecha_solicitada: DataTypes.DATE,
    nueva_hora_inicio: DataTypes.TIME,
    nueva_hora_fin: DataTypes.TIME,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScheduleRequest',
  });

  return ScheduleRequest;
};
