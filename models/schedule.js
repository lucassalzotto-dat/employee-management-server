// models/schedule.js
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      // Asociación: un horario pertenece a un empleado
      Schedule.belongsTo(models.Employee, { foreignKey: 'id_empleado', as: 'employee' });
    }
  }
  Schedule.init(
    {
      id_empleado: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      hora_inicio: DataTypes.TIME,
      hora_fin: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: 'Schedule',
    }
  );
  return Schedule;
};
