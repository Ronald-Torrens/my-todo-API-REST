'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn(
      'tasks',
      'customer_id',
      'user_id'
    );
  },

  async down(queryInterface) {
    await queryInterface.renameColumn(
      'tasks',
      'user_id',
      'customer_id'
    );
  }
};