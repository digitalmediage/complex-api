const mongoose = require('mongoose');
const PropertySchema = require('./../models/property.model');

PropertySchema.statics = {
  get(query, cb) {
    this.find(query, cb);
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
