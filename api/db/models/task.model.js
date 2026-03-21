const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  },
  customerId: {
    field: 'customer_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
  };

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: true,
    };
  };
};

module.exports = { TASK_TABLE, TaskSchema, Task };
