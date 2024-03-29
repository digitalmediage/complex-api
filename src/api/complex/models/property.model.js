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
    baner: {
      type: ObjectId,
      ref: 'Media',
    },
    images: [{
      type: [ObjectId],
      ref: 'Media',
    }],
  },
  size: Number,
  rooms: {
    beds_rooms: {
      type: Number,
      default: 0,
    },
    bath_rooms: {
      type: Number,
      default: 0,
    },
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
  condition: {
    type: String,
    enum: ['black frame', 'white frame'],
  },
  type: {
    type: String,
    enum: ['Apartment', 'Office', 'Commercial'],
  },
  status: {
    type: String,
    enum: ['sold', 'available', 'reserved', 'unavailable'],
  },
  deal_type: {
    type: String,
    enum: ['sell', 'rent'],
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
