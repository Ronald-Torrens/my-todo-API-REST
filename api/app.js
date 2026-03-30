const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middleware/auth.handler');
const cookieParser = require('cookie-parser');
const { config } = require('./config/config');

const { errorHandler, logErrors, boomErrorHandler, sqlErrorHandler } = require('./middleware/error.handler');

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');

const app = express();

const whitelist = config.corsOrigins;

const options = {
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    };
  },
  credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(options));

require('./utils/auth');

app.get('/api',
  checkApiKey,
  (req, res) => {
    res.send(`<h1>Server with Express.js...</h1>`);
  }
);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

routerApi(app);

app.use(logErrors);
app.use(sqlErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
