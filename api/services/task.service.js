const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class TasksService {
  constructor() {}

  async create(data, userId) {
    try {
      const newTask = await models.Task.create({
        ...data,
        userId
      });
      return newTask;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict('Task name already exists');
      }
      throw error;
    };
  };

  async find(userId, query = {}) {
    const options = {
      where: { userId }
    };

    if (query.completed !== undefined) {
      options.where.completed = query.completed === 'true';
    };

    if (query.limit) options.limit = parseInt(query.limit);
    if (query.offset) options.offset = parseInt(query.offset);
    if (query.sortBy) {
      options.order = [[query.sortBy, query.sortOrder?.toUpperCase() || 'ASC']];
    };

    const tasks = await models.Task.findAll(options);
    return tasks;
  };

  async findAll(query = {}) {
    const options = {};

    if (query.completed !== undefined) {
      options.where = { completed: query.completed === 'true' };
    };

    if (query.limit) options.limit = parseInt(query.limit);
    if (query.offset) options.offset = parseInt(query.offset);
    if (query.sortBy) {
      options.order = [[query.sortBy, query.sortOrder?.toUpperCase() || 'ASC']];
    };

    return await models.Task.findAll(options);
  };

  async findOne(id, userId = null ) {

    const where = { id };
    if (userId) where.userId = userId;

    const task = await models.Task.findOne({ where });

    if(!task) {
      throw boom.notFound('Task not found.');
    }
    return task;
  };

  async update(id, changes, userId) {
    const task = await this.findOne(id, userId);
    const taskUpdate = await task.update(changes);
    return taskUpdate;
  };

  async delete(id, userId) {
    const task = await this.findOne(id, userId);
    await task.destroy();
    return {
      message: 'Deleted successfully.',
      id
    };
  };

  async deleteAll(userId) {
    const deleted = await models.Task.destroy({
      where: { userId }
    });

    return {
      message: 'All tasks deleted',
      deleted
    };
  };
};

module.exports = TasksService;
