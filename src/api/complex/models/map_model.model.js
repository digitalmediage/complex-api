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
  },
  floor: mongoose.Schema.Types.ObjectId,
  info: String,
});

module.exports = MapMediaSchema;
