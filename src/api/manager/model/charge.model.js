const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectId;
const desimal = mongoose.Schema.Types.Decimal128;

const chargeSchema = new mongoose.Schema({
  user: {
    type: objectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  charge_price: {
    type: desimal,
    required: true,
  },
  amount: desimal,
  charge_date: Date,
  property: {
    type: objectId,
    ref: 'Property',
  },
  comment: String,
  notify_status: Boolean,
}, {
  timestamps: true,
});


module.exports = chargeSchema;
