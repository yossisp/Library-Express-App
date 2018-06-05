const express = require('express');
const debug = require('debug')('app:adminRoutes');
const constants = require('../config/constants.js');
const middleware = require('../middleware/middleware.js');

const adminRouter = express.Router();
const books = [
  {
    title: 'Catch-22',
    author: 'Joseph Heller',
    bookId: 168668
  },
  {
    title: 'Catcher In The Rye',
    author: 'J. D. Salinger',
    bookId: 5107
  },
  {
    title: 'War and Peace',
    author: 'Tolstoy',
    bookId: 656
  }
];

function router(dbConnection) {
  adminRouter.use(middleware);
  adminRouter.route(constants.ROUTES.ROOT)
    .get((req, res) => {
      (async function mongoAdminRoute() {
        try {
          const db = dbConnection.client.db(constants.DB_NAME);
          const response = await db.collection(constants.DB_COLLECTIONS.BOOKS).insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return adminRouter;
}

module.exports = router;
