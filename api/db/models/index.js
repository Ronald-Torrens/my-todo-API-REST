
const { UserSchema, User } = require('./user.model');
const { CustomerSchema, Customer } = require('./customer.model');
const { TaskSchema, Task  } = require('./task.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Task.associate(sequelize.models);
};

module.exports = setupModels;
