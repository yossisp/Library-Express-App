const constants = require('../config/constants.js');

function middleware(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(constants.ROUTES.ROOT);
  }
}

module.exports = middleware;
