const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');

module.exports = function passportConfig(app, dbConnection) {
  LocalStrategy(dbConnection);
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
