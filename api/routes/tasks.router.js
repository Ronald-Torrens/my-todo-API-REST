const express = require('express');
const router = express.Router();

const TasksService = require('../services/task.service');
const service = new TasksService();

const validatorHandler = require('../middleware/validator.handler');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../schemas/tasks.schemas');

const passport = require('passport');
const { checkRoles, checkOwnershipOrAdmin } = require('../middleware/auth.handler');


router.get('/',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles('admin', 'seller'),
  async (req, res, next) => {
    try {
      const tasks = await service.find();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    };
  }
);

// Generando consulta específica por id:
router.get('/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles('admin', 'seller'),
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await service.findOne(id);
      res.status(200).json(task);
    } catch (error) {
      next (error);
    }
  }
);

// Generando el método POST:

router.post('/',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles('admin', 'seller'),
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    };
  }
);

// Generando el método PATCH:

router.patch('/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles('admin', 'seller'),
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.update(id, body);
      res.status(200).json(updateProduct);

    } catch (error) {
      next(error);
    };
  }
);

// Generando el método DELETE:

router.delete('/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkOwnershipOrAdmin,
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteProduct = await service.delete(id);
      res.status(200).json(deleteProduct);
    } catch (error) {
      next(error);
    };
  }
);

router.delete('/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkOwnershipOrAdmin,
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteProduct = await service.delete(id);
      res.status(200).json(deleteProduct);
    } catch (error) {
      next(error);
    };
  }
);

router.delete('/',
  //passport.authenticate('jwt', { session: false }),
  //checkOwnershipOrAdmin,
  async (req, res, next) => {
    try {
      const result = await service.deleteAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
