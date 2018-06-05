const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });
const apiKey = 'oN0VtM3MRQ2qDU7sBC6MzQ';

function goodreadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      const url = `https://www.goodreads.com/book/show/${bookId}.xml`;
      axios.get(url, {
        params: {
          key: apiKey
        }
      })
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result.GoodreadsResponse.book.title);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService();
