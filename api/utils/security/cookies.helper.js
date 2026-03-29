const { config } = require('../../config/config');

function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie('accessToken', accessToken, config.cookieOptions.access);
  res.cookie('refreshToken', refreshToken, config.cookieOptions.refresh);
}

function clearAuthCookies(res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
}

module.exports = {
  setAuthCookies,
  clearAuthCookies
};