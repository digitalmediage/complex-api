const mongoose = require('mongoose');
const chargeSchema = require('./../model/charge.model');

chargeSchema.statics = {
  create(data, cb) {
    const charge = new this(data);
    charge.save(cb);
  },
};

module.exports = mongoose.model('Charge', chargeSchema);
