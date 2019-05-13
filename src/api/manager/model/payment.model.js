const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectId;
const desimal = mongoose.Schema.Types.Decimal128;

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: desimal,
    required: true,
  },
  document: objectId,
}, {
  timestamps: true,
});


module.exports = paymentSchema;
