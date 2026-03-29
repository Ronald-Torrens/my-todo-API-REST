'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('tasks', {
      fields: ['user_id', 'name'],
      type: 'unique',
      name: 'unique_task_name_per_user'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'tasks',
      'unique_task_name_per_user'
    );
  }
};
