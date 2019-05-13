const mongoose = require('mongoose');


const NumberRequired = {
  type: Number,
  required: true,
};


/**
 * User Schema
 * @private
 */

const MapMediaSchema = new mongoose.Schema({
  complex: mongoose.Schema.Types.ObjectId,
  selected_area: {
    x: NumberRequired,
    y: NumberRequired,
    width: NumberRequired,
    height: NumberRequired,
    floor: {
      floor_number: Number,
      floor_title: String,
      floor_image: mongoose.Schema.Types.ObjectId,
    },
    info: String,
  },
  image: mongoose.Schema.Types.ObjectId,
}, {
  timestamps: true,
});

module.exports = MapMediaSchema;
