const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);

const createTaskSchema = Joi.object({
  name: name.required()
});

const updateTaskSchema = Joi.object({
  name: name.required()
});

const getTaskSchema = Joi.object({
  id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };
