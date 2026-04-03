'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', 'users_nickname_key1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex('users', ['nickname'], {
      name: 'users_nickname_key1',
      unique: true
    });
  }
};
