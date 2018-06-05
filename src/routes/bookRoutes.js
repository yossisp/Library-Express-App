const express = require('express');
const constants = require('../config/constants.js');
const bookController = require('../controllers/bookController.js');
const bookService = require('../services/goodreadsService.js');
const middleware = require('../middleware/middleware.js');

const bookRouter = express.Router();

function router(nav, dbConnection) {
  const { getAllBooks, getBookByID } = bookController(nav, dbConnection, bookService);
  bookRouter.use(middleware);
  bookRouter.route(constants.ROUTES.ROOT)
    .get(getAllBooks);

  bookRouter.route('/:id')
    .get(getBookByID);

  return bookRouter;
}

module.exports = router;
