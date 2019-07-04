/* eslint-disable no-undef */
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const {
  port,
  env,
} = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

const socketEvents = require('./api/utils/socket');
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

socketEvents(io);

// const mongoose = require('mongoose');
// const socket = require('socket.io')(http);
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

// // Listen for socket
// socket.on('connection', () => {
//   console.log('a user is connected');
// });

// // eslint-disable-next-line func-names
// // eslint-disable-next-line prefer-arrow-callback
// // eslint-disable-next-line func-names
// socket.on('chat message', (msg) => {
//   console.log(`message =>> ${msg} `);
//   // broadcast message to everyone in port:5000 except yourself.
//   socket.broadcast.emit('received', {
//     message: msg,
//   });
// });

// const Message = mongoose.model('Message', {
//   name: String,
//   message: String
// })


// createTerminus(app, terminusOptions);
// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
