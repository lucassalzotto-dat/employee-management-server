'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agrega una restricción de unicidad a `id_usuario` en `Employees`
    await queryInterface.changeColumn('Employees', 'id_usuario', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true, // Asegura que un usuario solo pueda tener un empleado
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir la restricción de unicidad en `id_usuario` si es necesario
    await queryInterface.changeColumn('Employees', 'id_usuario', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false, // Quitar la restricción en caso de revertir
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
