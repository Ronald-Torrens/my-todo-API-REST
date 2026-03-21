
const express = require('express');

const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const tasksRouter = require('./tasks.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router) // creación de ruta global.

  router.use(`/users`, usersRouter);
  router.use(`/customers`, customersRouter);
  router.use(`/auth`, authRouter);
  router.use(`/tasks`, tasksRouter);
};

module.exports = routerApi;
