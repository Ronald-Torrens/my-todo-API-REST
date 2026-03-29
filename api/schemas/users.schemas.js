const Joi = require('joi');

const id = Joi.number().integer();
const nickname = Joi.string().min(3).max(15);
const email = Joi.string().email().max(50);
const password = Joi.string().min(8);
const role = Joi.string().valid('user', 'admin');

const createUserSchema = Joi.object({
  nickname: nickname.required(),
  email: email.required(),
  password: password.required(),
  role: role
});

const updateUserSchema = Joi.object({
  nickname: nickname,
  email: email,
  password: password,
  role: role
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
