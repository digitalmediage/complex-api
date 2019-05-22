const mongoose = require('mongoose');
const PropertySchema = require('./../models/property.model');

const { listProperty } = require('./../../utils/paginationFilter');

PropertySchema.statics = {

  async create(data, cb) {
    const property = new this(data);
    await property.save(cb);
  },

  async get(query, cb, options) {
    await listProperty(query, cb, options.page, options.perPage, this);
  },

  async getById(id, cb) {
    await this.findOne({ _id: id }, cb)
      .populate('complex');
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

  get_complex(query, cb) {
    this.findOne(query, cb)
      .populate('complex');
  },
};


module.exports = mongoose.model('Property', PropertySchema);
