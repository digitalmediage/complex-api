const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectId;
const desimal = mongoose.Schema.Types.Decimal128;

const chargeSchema = new mongoose.Schema({
  user: {
    type: objectId,
  },
  name: String,
  charge_price: desimal,
  amount: desimal,
  charge_date: Date,
  property: objectId,
  comment: String,
  notify_status: Boolean,
}, {
  timestamps: true,
});


module.exports = chargeSchema;
