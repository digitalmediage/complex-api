const mongoose = require('mongoose');


/**
 * User Schema
 * @private
 */

const mediaSchema = new mongoose.Schema({
  name: String,
  type: String,
  path: String,

}, {
  timestamps: true,
});

module.exports = mongoose.model('Media', mediaSchema);
