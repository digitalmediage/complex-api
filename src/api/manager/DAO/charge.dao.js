// Core Model Dependency
const mongoose = require('mongoose');

// Model
const chargeSchema = require('./../model/charge.model');

// Utility
const { listCharge } = require('./../../utils/paginationFilter');

chargeSchema.statics = {
  create(data, cb) {
    const charge = new this(data);
    charge.save(cb);
  },

  async get(query, cb, options) {
    await listCharge(query, cb, options.page, options.perPage, this);
  },
};


module.exports = mongoose.model('Charge', chargeSchema);
