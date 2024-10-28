// migrations/YYYYMMDDHHMMSS-add-user-association-to-employee.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Employees', {
      fields: ['id_usuario'],
      type: 'foreign key',
      name: 'fk_employees_user', // Nombre de la restricción
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Employees', 'fk_employees_user');
  }
};
