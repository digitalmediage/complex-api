const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const ObjectId = mongoose.Schema.Types.ObjectId;
const Decimal = mongoose.Schema.Types.Decimal128;
const StingRequired = {
  type: String,
  required: true,
};


/**
 * User Schema
 * @private
 */

const propertySchema = new mongoose.Schema({
  name: StingRequired,
  complex: {
    type: ObjectId,
    ref: 'Complex',
  },
  manager: ObjectId,
  media: ObjectId,
  size: Number,
  rooms: {
    beds_rooms: Number,
    rest_rooms: Number,
    bath_rooms: Number,
    garage: Number,
  },
  features: [String],
  reservation: {
    status: Boolean,
    can_reserve: Boolean,
    min_price: Decimal,
    min_time: Number,
  },
  veranda_size: Number,
  information: String,
  type: {
    type: String,
    enum: ['Home', 'office'],
  },
  sales_status: {
    type: String,
    enum: ['sold', 'available', 'reserved'],
  },
  cadastra: String,
  soft_delete: Boolean,
}, {
  timestamps: true,
});

module.exports = propertySchema;
