// Core main module dependency
const mongoose = require('mongoose');
const httpStatus = require('http-status');

// Model
const MediaModel = require('./../models/media.model');
const UserModel = require('./../../user/models/user.model');

// Utility
const APIError = require('./../../utils/APIError');
const {
  checkExistedObjectIdAtDocument,
} = require('./../../utils/ModelHelper');
const GeorgiaCities = require('./../../utils/GeorgiaCities');


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
    ref: 'User',
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
    ll: String,
    spn: String,
    layer: String,
    t: String,
    z: String,
  },
  map_model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mapModel',
  },
  views_count: Number,
  city: {
    type: String,
    enum: GeorgiaCities,
  },
  country: {
    type: String,
    default: 'Georgia',
  },
  build_year: Date,
  address: stringRequired,
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

// complexSchema.pre('update', async (next) => {
//   try {
//     console.log('map_image -- block');
//     console.log(this.map_image);
//     if (this.map_image !== null) {
//       await checkExistedObjectIdAtDocument(this.map_image, MediaModel, null, 'image file not exist');
//       console.log('map_image if block');
//     }
//   } catch (error) {
//     next(error);
//   }
// });


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


    return next();
  } catch (error) {
    console.log(error);
    console.log(error);
    return next(error);
  }
});


module.exports = complexSchema;
