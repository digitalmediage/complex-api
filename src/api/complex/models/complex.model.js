const mongoose = require('mongoose');


const stringRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const complexSchema = new mongoose.Schema({
  name: stringRequired,
  cadastra: stringRequired,
  developer: mongoose.Schema.Types.ObjectId,
  properties: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Property',
  },
  manager: {
    current_manager: mongoose.Schema.Types.ObjectId,
    history: [mongoose.Schema.Types.ObjectId],
  },
  information: String,
  media: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Media',
  },
  map_images: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Media',
  },
  location: {
    lan: String,
    t: String,
  },
  map_model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mapModel',
  },
  views_count: Number,
  city: String,
  origin: String,
  build_year: Date,
  address: String,
  contact: {
    email: String,
    tell: stringRequired,
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
