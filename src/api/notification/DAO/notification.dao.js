// Core Model Dependency
const mongoose = require('mongoose');

// Model
const notificationSchema = require('../Model/Notification.model');

// Utility
// const {
//   listComplex
// } = require('./../../utils/paginationFilter');

notificationSchema.statics = {

  //   async get(query, cb, options) {
  //     await listComplex(query, cb, options.page, options.perPage, this);
  //   },

  async get(query, cb) {
    await this.find(query, cb);
  },
};

module.exports = mongoose.model('Notification', notificationSchema);
