/* eslint-disable no-undef */
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
// const { createTerminus } = require('@godaddy/terminus');

// open mongoose connection
mongoose.connect();


// shutdown and Kubernetes readiness / liveness checks for any HTTP applications

// const onShutdown = () => {
//   console.log('cleanup finished, server is shutting down');
// };

// const terminusOptions = {
//   onShutdown,
// };

// createTerminus(app, terminusOptions);

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
