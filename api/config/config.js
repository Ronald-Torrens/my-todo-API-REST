require('dotenv').config({ quiet: true });

// Variables para auth0 - Estrategias de Autenticación
const requiredEnv = [
  'JWT_SECRET',
  'JWT_RECOVERY_SECRET',
  'API_KEY'
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is required`);
  }
});

const apiKey = process.env.API_KEY
const jwtSecret = process.env.JWT_SECRET
const jwtRecoverySecret = process.env.JWT_RECOVERY_SECRET


// Variables para DB
const requiredDB = ['DB_USER', 'DB_PASS', 'DB_HOST_PG', 'DB_NAME_PG'];
requiredDB.forEach((key) => {
  if (!process.env[key]) throw new Error(`Environment variable ${key} is required`);
});

const dbUser = process.env.DB_USER || process.env.PGUSER;
const dbPassword = process.env.DB_PASS || process.env.PGPASSWORD;
const dbHost = process.env.DB_HOST_PG || process.env.PGHOST;
const dbName = process.env.DB_NAME_PG || process.env.PGDATABASE;
const dbPort = process.env.DB_EXTERNAL_PORT_PG || process.env.PGPORT || 5433;


// Variables para recuperación de correo - Estrategias de Autenticación
const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpUser = process.env.SMTP_USER
const smtpPassword = process.env.SMTP_PASSWORD

// Construir URL de conexión si no hay DATABASE_URL
const dbUrl =
  process.env.DATABASE_URL ||
  `postgres://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@${dbHost}:${dbPort}/${dbName}`;

// Configuración de cookies para auth con httpOnly
const cookieOptions = {
  access: {
    httpOnly: true,
    secure: true, // true en prod
    sameSite: 'none',
    maxAge: 15 * 60 * 1000 // 15 minutos
  },
  refresh: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
  }
};

// Configuración para CORS:
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  port: process.env.PORT || 3000,

  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
  dbUrl,

  apiKey,
  jwtSecret,
  jwtRecoverySecret,

  smtpHost,
  smtpPort,
  smtpUser,
  smtpPassword,

  cookieOptions,

  corsOrigins
};

module.exports = { config };
