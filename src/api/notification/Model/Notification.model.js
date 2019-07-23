// Core main module dependency
const mongoose = require('mongoose');
const moment = require('moment');


const stringRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const notificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: stringRequired,
  content: String,
  status: String,
  createdAt: {
    type: String,
    default: moment().format('MM/DD/YYYY'),
  },
});

notificationSchema.index({
  '$**': 'text',
});


module.exports = notificationSchema;
