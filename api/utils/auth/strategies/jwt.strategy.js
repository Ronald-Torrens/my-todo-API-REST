const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.accessToken;
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.jwtSecret
};

const JwtStrategy = new Strategy( options, ( payload, done ) => {
  return done( null, payload );
});

module.exports = JwtStrategy;
