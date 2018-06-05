const constants = require('../config/constants.js');
const debug = require('debug')('app:bookController');
const { ObjectID } = require('mongodb');

function bookController(nav, dbConnection, bookService) {

  function getAllBooks(req, res) {
    (async function mongoFindAll() {
      try {
        const db = dbConnection.client.db(constants.DB_NAME);
        const bookCollection = await db.collection(constants.DB_COLLECTIONS.BOOKS);
        const books = await bookCollection.find().toArray(); // find all records
        res.render(
          constants.VIEWS.BOOK_LIST_VIEW,
          {
            nav,
            title: constants.TITLES.MY_LIBRARY,
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function getBookByID(req, res) {
    const { id } = req.params;
    (async function mongoFindId() {
      try {
        const db = dbConnection.client.db(constants.DB_NAME);
        const bookCollection = await db.collection(constants.DB_COLLECTIONS.BOOKS);
        const book = await bookCollection.findOne({
          _id: new ObjectID(id)
        });
        debug(book);
        book.details = await bookService.getBookById(book.bookId);
        res.render(
          constants.VIEWS.BOOK_VIEW,
          {
            nav,
            title: constants.TITLES.BOOK,
            book
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  return { getAllBooks, getBookByID };
}

module.exports = bookController;
