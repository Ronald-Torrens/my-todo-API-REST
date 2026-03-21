'use strict';

/** @type {import('sequelize-cli').Migration} */

const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const { TASK_TABLE, TaskSchema } = require('../models/task.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
  }
};
