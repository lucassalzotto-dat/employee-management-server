'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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