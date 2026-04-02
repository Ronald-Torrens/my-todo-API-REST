const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const completed = Joi.boolean();

const createTaskSchema = Joi.object({
  name: name.required()
});

const updateTaskSchema = Joi.object({
  name: name,
  completed: completed
});

const getTaskSchema = Joi.object({
  id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };
