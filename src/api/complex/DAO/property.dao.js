const mongoose = require('mongoose');
const PropertySchema = require('./../models/property.model');

const list = require('./../../utils/paginationFilter');

PropertySchema.statics = {

  async get(query, cb, options) {
    await list(query, cb, options.page, options.perPage, this);
  },

  create(data, cb) {
    const property = new this(data);
    property.save(cb);
  },

  get_complex(query, cb) {
    this.findOne(query, cb)
      .populate('complex');
  },
};


module.exports = mongoose.model('Property', PropertySchema);
