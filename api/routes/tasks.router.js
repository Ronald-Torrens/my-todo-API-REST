const express = require('express');
const router = express.Router();

const TasksService = require('../services/task.service');
const service = new TasksService();

const validatorHandler = require('../middleware/validator.handler');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../schemas/tasks.schemas');

const passport = require('passport');
const { checkRoles, checkOwnershipOrAdmin } = require('../middleware/auth.handler');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res, next) => {
  try {
    const { completed, limit, offset, sortBy, sortOrder } = req.query;
    
    const queryOptions = {
      completed: completed === undefined ? undefined : completed === 'true',
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      order: sortBy ? [[sortBy, sortOrder || 'ASC']] : undefined
    };

    let tasks;

    if (req.user.role === 'admin') {
      tasks = await service.findAll(queryOptions);
    } else {
      tasks = await service.find(req.user.sub, queryOptions);
    };

    res.status(200).json(tasks);
    
  } catch (error) {
    next(error);
  };
});

// Obtener todas las tasks del usuario logueado (endpoint semántico /me)
router.get('/me',
  async (req, res, next) => {
    try {
      const tasks = await service.find(req.user.sub);
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

// Generando consulta específica por id:
router.get('/:id',
  validatorHandler(getTaskSchema, 'params'),
  checkOwnershipOrAdmin('id'),
  async (req, res, next) => {
    try {
      const task = await service.findOne(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      next (error);
    }
  }
);

// Crear una nueva task:
router.post('/',
  checkRoles('admin', 'user'),
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const newTask = await service.create(
        req.body,
        req.user.sub
      );
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    };
  }
);

// Actualizar task:

router.patch('/:id',
  validatorHandler(getTaskSchema, 'params'),
  checkOwnershipOrAdmin('id'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const updateTask = await service.update(
        req.params.id,
        req.body
      );
      res.status(200).json(updateTask);

    } catch (error) {
      next(error);
    };
  }
);

// Generando el método DELETE:

router.delete('/:id',
  validatorHandler(getTaskSchema, 'params'),
  checkOwnershipOrAdmin('id'),
  async (req, res, next) => {
    try {
      const deleteTask = await service.delete(req.params.id);
      res.status(200).json(deleteTask);
    } catch (error) {
      next(error);
    };
  }
);

router.delete('/',
  checkRoles('user', 'admin'),
  async (req, res, next) => {
    try {
      const result = await service.deleteAll(req.user.sub);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /tasks/user/:userId
router.delete('/user/:userId',
  checkRoles('admin'),          // solo admin puede
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const result = await service.deleteAll(userId);  // reutiliza tu método del servicio
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
