'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('tasks', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_task_name'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('tasks', 'unique_task_name');
  }
};
