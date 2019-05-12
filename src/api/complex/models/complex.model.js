const mongoose = require('mongoose');


const StingRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const complexSchema = new mongoose.Schema({
  name: StingRequired,
  cadastra: StingRequired,
  developer: mongoose.Schema.Types.ObjectId,
  properties: mongoose.Schema.Types.ObjectId,
  information: String,
  media: mongoose.Schema.Types.ObjectId,
  map_images: [mongoose.Schema.Types.ObjectId],
  location: {
    lan: String,
    t: String,
  },
  map_model: mongoose.Schema.Types.ObjectId,
  build_year: Date,
  address: String,
  contact: {
    email: StingRequired,
    tell: StingRequired,
  },
  charge_fee: mongoose.Schema.Types.Decimal128,
  floor: {
    type: Number,
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = complexSchema;
