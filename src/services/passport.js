const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const User = require('../models/user/user.model');
const config = require('config');

const params = {
  secretOrKey: config.get('jwtSecret'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const strategy = new Strategy(params, async (jwt_payload, done) => {
  try {
    const user = await User.findById({
      _id: jwt_payload._id,
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});
passport.use(strategy);

module.exports = {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: function () {
    return passport.authenticate('jwt', { session: false });
  },
};
