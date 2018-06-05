const passport = require('passport');
const { MongoClient } = require('mongodb');
const constants = require('../../config/constants.js');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const bcrypt = require('bcrypt');

module.exports = function localStrategy(dbConnection) {
  passport.use(new Strategy({
    usernameField: constants.VIEWS.USERNAME_INPUT_FORM,
    passwordField: constants.VIEWS.PASSWORD_INPUT_FORM
  }, (username, password, done) => {
    (async function mongoLocalStrategy() {
      try {
        if (typeof dbConnection.client === 'undefined' || !dbConnection.client.isConnected()) {
          dbConnection.client = await MongoClient.connect(constants.MONGODB_URL);
          debug('Connected to mongo');
        }
        const db = dbConnection.client.db(constants.DB_NAME);
        const userCollection = db.collection(constants.DB_COLLECTIONS.USERS);
        const user = await userCollection.findOne({ username: username.toLowerCase() });
        debug(user);
        if (user && await bcrypt.compare(password, user.hashedPassword)) {
          done(null, user);
          debug('user found');
        } else {
          // the user entered wrong login details so we stop mongo connection
          dbConnection.client.close();
          debug('closed mongo connection');
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
        if (typeof dbConnection.client !== 'undefined' && dbConnection.client.isConnected()) {
          dbConnection.client.close();
        }
      }
    }());
    }));
};
