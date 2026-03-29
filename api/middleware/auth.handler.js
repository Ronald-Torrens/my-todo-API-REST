const boom = require('@hapi/boom');
const TasksService = require('../services/task.service');
const { compareData } = require('../utils/security/hash.helper');
const { config } = require('../config/config');

// Instanciamos el servicio de tareas aquí para validar propiedad
const service = new TasksService();

// Middleware flexible para roles
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

// Middleware para recurso propio o admin
const checkOwnershipOrAdmin = (paramIdField = 'id') => {
  return async (req, res, next) => {
    const user = req.user;
    const resourceId = Number(req.params[paramIdField]);

    // Admin puede acceder a cualquier recurso
    if (user.role === 'admin') return next();

    try {
      // Usuario normal: validar que la tarea le pertenezca
      const task = await service.findOne(resourceId, user.sub); 
      if (!task) {
        return next(boom.forbidden('You do not have permission'));
      }
      next();
    } catch (error) {
      // cualquier error => Forbidden
      next(boom.forbidden('You do not have permission'));
    }
  };
};

// Protege la API con una clave global (opcional)
async function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  const isMatch = await compareData(apiKey, config.apiKey);
  if (isMatch) next();
  else next(boom.unauthorized());
}

module.exports = { checkApiKey, checkRoles, checkOwnershipOrAdmin };