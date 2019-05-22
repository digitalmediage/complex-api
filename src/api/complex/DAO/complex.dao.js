// Core Model Dependency
const mongoose = require('mongoose');

// Model
const complexSchema = require('./../models/complex.model');

// Utility
const list = require('./../../utils/paginationFilter');

complexSchema.statics = {

  async get(query, cb, options) {
    await list(query, cb, options.page, options.perPage, this);
  },

  async getById(id, cb) {
    await this.findOne({ _id: id }, cb);
  },

  async create(data, cb) {
    const complex = new this(data);
    await complex.save(cb);
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

  async testo(query, cb) {
    await this.aggregate([
      { $match: { } },
    ], cb);
  },
};


module.exports = mongoose.model('Complex', complexSchema);
