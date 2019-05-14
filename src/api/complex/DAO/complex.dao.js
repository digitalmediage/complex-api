const mongoose = require('mongoose');
const complexSchema = require('./../models/complex.model');

complexSchema.statics = {
  async get(query, cb) {
    await this.find(query, cb);
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
};


module.exports = mongoose.model('Complex', complexSchema);
