'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'nickname', {
      type: Sequelize.STRING,
      allowNull: true, // si quieres permitir que algunos usuarios no tengan nickname
      unique: true     // opcional, si quieres que no se repita
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'nickname');
  }
};
