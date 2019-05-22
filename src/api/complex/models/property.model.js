// Core main module dependency
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
  owner: ObjectId,
  media: {
    type: [ObjectId],
    ref: 'Media',
  },
  size: Number,
  rooms: {
    beds_rooms: Number,
    rest_rooms: Number,
    bath_rooms: Number,
    garage: Number,
  },
  features: [String],
  furnish: {
    type: String,
    enum: ['none', 'semi-furnish', 'full-furnish'],
  },
  reservation: {
    status: Boolean,
    can_reserve: Boolean,
    min_price: Decimal,
    min_time: Number,
    paid_money: Boolean,
  },
  price: Decimal,
  views_count: Number,
  veranda_size: Number,
  information: String,
  type: {
    type: String,
    enum: ['Home', 'office', 'land', 'apartment', 'commercial'],
  },
  status: {
    type: String,
    enum: ['sold', 'available', 'reserved', 'unavailable'],
  },
  deal_type: {
    type: String,
    enum: ['sell', 'rent', 'short_term_rent', 'lease', 'barter'],
  },
  cadastra: String,
  soft_delete: Boolean,
}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
propertySchema.index({
  '$**': 'text',
});

// propertySchema.pre('save', async function save(next) {

// });

module.exports = propertySchema;
