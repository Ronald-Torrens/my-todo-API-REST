const boom = require('@hapi/boom');
const express = require('express');
const passport = require('passport');

const router = express.Router();

const { loginLimiter, recoveryLimiter, changePasswordLimiter } = require('../utils/security/rateLimiter.helper');
const validatorHandler = require('../middleware/validator.handler');
const { loginAuthSchema, recoveryAuthSchema, changePasswordAuthSchema } = require('../schemas/auth.schemas');
const { setAuthCookies, clearAuthCookies } = require('../utils/security/cookies.helper');

const AuthService = require('../services/auth.service');
const service = new AuthService();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post('/login',
  loginLimiter,
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {

      const user = req.user;
      const { accessToken, refreshToken, user: userData } = await service.signToken(user);

      setAuthCookies(res, accessToken, refreshToken);

      res.status(200).json({
        user: userData
      });

    } catch (error) {
      next(error);
    };
  }
);

router.post('/refresh', async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw boom.unauthorized('Refresh token missing');
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await service.refreshToken(refreshToken);

    setAuthCookies(res, accessToken, newRefreshToken);

    res.json({ message: 'Token refreshed' });

  } catch (error) {
    next(error);
  };
});

router.post('/recovery',
  recoveryLimiter,
  validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecovery(email);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    };
  }
);

router.post('/change-password',
  changePasswordLimiter,
  validatorHandler(changePasswordAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    };
  }
);

router.post('/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {

      const userId = req.user.sub;

      await service.logout(userId);

      clearAuthCookies(res);

      res.json({ message: 'Logged out' });

    } catch (error) {
      next(error);
    };
  }
);

module.exports = router;
