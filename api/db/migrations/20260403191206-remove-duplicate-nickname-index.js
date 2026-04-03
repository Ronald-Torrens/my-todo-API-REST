'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_nickname_key1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['nickname'],
      type: 'unique',
      name: 'users_nickname_key1'
    });
  }
};
