// Core Model Dependency
const mongoose = require('mongoose');

// Model
const chargeSchema = require('./../model/charge.model');

// Utility
const {
  listCharge
} = require('./../../utils/paginationFilter');

chargeSchema.statics = {
  async create(data, cb) {
    const charge = new this(data);
    await charge.save(cb);
  },

  async get(query, cb, options) {
    await listCharge(query, cb, options.page, options.perPage, this);
  },

  async update(query, updateData, cb) {
    await this.findOneAndUpdate(query, {
      $set: updateData,
    }, {
      new: true,
    }, cb);
  },

  async delete(query, cb) {
    await this.findOneAndDelete(query, cb);
  },

};


module.exports = mongoose.model('Charge', chargeSchema);
