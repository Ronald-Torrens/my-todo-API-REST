
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  refreshToken: {
    field: 'refresh_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user'
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
  }
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks'
    });
  };

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      defaultScope: { // Siempre oculta para respuestas de todas las consultas
        attributes: {
          exclude: ['password', 'recoveryToken', 'refreshToken']
        }
      },
      scopes: {
        withPassword: { // Sólo muestra para el login
          attributes: {}
        },
        withRecoveryToken: {
          attributes: ['id', 'email', 'recoveryToken']
        },
        withRefreshToken: {
          attributes: ['id', 'refreshToken']
        }
      }
    };
  };
};

module.exports = { USER_TABLE, UserSchema, User }
