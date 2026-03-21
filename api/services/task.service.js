const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class TasksService {
  constructor() {}

  async create(data) {
    try {
      const newTask = await models.Task.create(data);
      return newTask;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict('Task name already exists');
      }
      throw error;
    };
  };

  async find() {
    const tasks = await models.Task.findAll({
      include: ['customer']
    });
    return tasks;
  };

  async findOne(id) {
    const task = await models.Task.findByPk(id);
    if(!task) {
      throw boom.notFound('Task not found.');
    }
    return task;
  };

  async update(id, changes) {
    const task = await this.findOne(id);
    const taskUpdate = await task.update(changes);
    return taskUpdate;
  };

  async delete(id) {
    const task = await this.findOne(id);
    await task.destroy();
    return {
      message: 'Deleted successfully.',
      id
    };
  };

  async deleteAll() {
    const deleted = await models.Task.destroy({
      where: {},
      truncate: true
    });

    return {
      message: 'All tasks deleted',
      deleted
    };
  }

};

module.exports = TasksService;
