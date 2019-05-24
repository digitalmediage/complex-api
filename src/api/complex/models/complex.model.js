// Core main module dependency
const mongoose = require('mongoose');
const httpStatus = require('http-status');

// Model
const MediaModel = require('./../models/media.model');

// Utility
const APIError = require('../../utils/APIError');


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
    const checkUploadFileExisted = async (path) => {
      console.log('path');
      console.log(path);
      console.log('path');
      const uploadFile = await MediaModel.find({
        _id: path,
      });
      console.log(uploadFile.length);
      console.log('developer');

      if (uploadFile.length === 0) {
        throw new APIError({
          message: ' image not uploaded ',
          status: httpStatus.CONFLICT,
        });
      }
    };

    if (this.map_image && this.map_image !== null) {
      await checkUploadFileExisted(this.map_image);
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
