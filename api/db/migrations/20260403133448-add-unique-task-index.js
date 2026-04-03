'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('tasks', ['user_id', 'name'], {
      name: 'unique_user_task_name',
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('tasks', 'unique_user_task_name');
  }
};

