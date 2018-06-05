const debug = require('debug')('app:db');
const { MongoClient } = require('mongodb');
const constants = require('./config/constants.js');

async function connectToMongo() {
  let client;
  try {
    client = await MongoClient.connect(constants.MONGODB_URL);
    debug('Connected to the db');
  } catch (err) {
    debug(err.stack);
  }
  return client;
}

module.exports = connectToMongo;
