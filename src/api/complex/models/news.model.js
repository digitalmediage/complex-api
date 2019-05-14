const mongoose = require('mongoose');


const stringRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const newsSchema = new mongoose.Schema({

  title: stringRequired,
  author: stringRequired,
  content: stringRequired,
  created_by: mongoose.Schema.Types.ObjectId,

}, {
  timestamps: true,
});

module.exports = newsSchema;
