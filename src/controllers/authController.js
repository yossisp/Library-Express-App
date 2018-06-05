const debug = require('debug')('app:authController');
const { MongoClient } = require('mongodb');
const constants = require('../config/constants.js');
const bcrypt = require('bcrypt');

// helper functions
async function getHashedPassword(password) {
  const salt = await bcrypt.genSalt(constants.SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

function authController(nav, dbConnection) {
  function signUpHandler(req, res) {
    debug(req.body);
    const { username, password } = req.body;
    if (username === constants.EMPTY_STR || password === constants.EMPTY_STR) {
      debug('username or password is blank');
      res.redirect(constants.ROUTES.ROOT);
    } else {
      (async function addUser() {
        try {
          if (typeof dbConnection.client === 'undefined' || !dbConnection.client.isConnected()) {
            dbConnection.client = await MongoClient.connect(constants.MONGODB_URL);
            debug('Connected to mongo');
          }
          const db = dbConnection.client.db(constants.DB_NAME);
          const userCollection = db.collection(constants.DB_COLLECTIONS.USERS);

          // password encryption
          const hashedPassword = await getHashedPassword(password);

          const user = { username: username.toLowerCase(), hashedPassword };
          const results = await userCollection.insertOne(user);
          req.login(results.ops[0], () => {
            res.redirect(constants.ROUTES.AUTH_SUCCESS_REDIRECT);
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    }
  }

  function signInHandler(req, res) {
    res.render(constants.VIEWS.SIGNIN, {
      nav,
      title: constants.TITLES.SIGNIN,
      username: constants.VIEWS.USERNAME_INPUT_FORM,
      password: constants.VIEWS.PASSWORD_INPUT_FORM,
      signInRoute: constants.ROUTES.AUTH_SIGNIN
    });
  }

  function profileHandler(req, res) {
    res.render(constants.VIEWS.PROFILE, {
      nav,
      title: constants.TITLES.MY_ACCOUNT,
      welcomeMessage: constants.WELCOME_MESSAGE
    });
  }

  function logoutHandler(req, res) {
    dbConnection.client.close();
    debug('closed db connection');
    req.logout();
    res.redirect(constants.ROUTES.ROOT);
  }

  return { signUpHandler, signInHandler, profileHandler, logoutHandler };
}

module.exports = authController;

