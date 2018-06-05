const express = require('express');
const passport = require('passport');
const constants = require('../config/constants.js');
const authController = require('../controllers/authController.js');
const middleware = require('../middleware/middleware.js');

const authRouter = express.Router();

function router(nav, dbConnection) {
  const { signUpHandler, signInHandler,
  profileHandler, logoutHandler } = authController(nav, dbConnection);

  authRouter.route(constants.ROUTES.SIGNUP)
    .post(signUpHandler);

  authRouter.route(constants.ROUTES.SIGNIN)
    .get(signInHandler)
    .post(passport.authenticate(constants.PASSPORT_STRATEGY_TYPE, {
      successRedirect: constants.ROUTES.AUTH_SUCCESS_REDIRECT,
      failureRedirect: constants.ROUTES.ROOT
    }));

  authRouter.route(constants.ROUTES.PROFILE)
    .all(middleware)
    .get(profileHandler);

  authRouter.route(constants.ROUTES.LOGOUT)
    .get(logoutHandler);

  return authRouter;
}

module.exports = router;
