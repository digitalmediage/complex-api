const mongoose = require('mongoose');
const logger = require('./../config/logger');
// eslint-disable-next-line no-unused-vars
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
* mongodb + srv: //root:root@cluster0-avr8o.gcp.mongodb.net/test?retryWrites=true
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
  mongoose.connect(mongo, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  return mongoose.connection;
};
