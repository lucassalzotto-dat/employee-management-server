'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('Schedules');
    if (!tableDescription.id_empleado) {
      await queryInterface.addColumn('Schedules', 'id_empleado', {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    } else {
      // Si la columna ya existe, asegurémonos de que sea única
      await queryInterface.changeColumn('Schedules', 'id_empleado', {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Schedules', 'id_empleado');
  }
};
