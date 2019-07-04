// Core main module dependency
const mongoose = require('mongoose');


const stringRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const notificationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: stringRequired,
    content: String,
    status: String,
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  '$**': 'text',
});


module.exports = notificationSchema;
