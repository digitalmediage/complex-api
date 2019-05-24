// Core main module dependency
const mongoose = require('mongoose');
const httpStatus = require('http-status');

// Model
const MediaModel = require('./../models/media.model');
const UserModel = require('./../../user/models/user.model');

// Utility
const APIError = require('./../../utils/APIError');
const { checkExistedObjectIdAtDocument } = require('./../../utils/ModelHelper');


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
  cadastra: String,
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  }],
  manager: {
    current_manager: mongoose.Schema.Types.ObjectId,
    history: [mongoose.Schema.Types.ObjectId],
  },
  information: String,
  media: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Media',
  },
  map_image: {
    type: mongoose.Schema.Types.ObjectId,
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
  country: String,
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

complexSchema.index({
  '$**': 'text',
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
complexSchema.pre('save', async function save(next) {
  try {
    // generate custom cadastra code
    if (!this.cadastra || this.cadastra === '') {
      const randomVal = (Math.random() * (9000 - 10)) + 10;
      this.cadastra = Math.round(randomVal);
    }

    // check if image_map not exist in media database
    // logic => image not uploaded, id not exist


    if (this.map_image && this.map_image !== null) {
      await checkExistedObjectIdAtDocument(this.map_image, MediaModel, null, 'image file not exist');
      console.log('map_image if block');
    }

    if (this.developer && this.developer !== null) {
      await checkExistedObjectIdAtDocument(this.developer, UserModel, {
        role: 'admin',
      }, 'developer not exist');
      console.log('developer if block');
    }


    return next();
  } catch (error) {
    console.log(error);
    console.log(error);
    return next(error);
  }
});


module.exports = complexSchema;
