const mongoose = require('mongoose');
const complexSchema = require('./../models/complex.model');

complexSchema.statics = {
  get(query, cb) {
    this.find(query, cb);
  },

  create(data, cb) {
    const complex = new this(data);
    complex.save(cb);
  },
};

module.exports = mongoose.model('Complex', complexSchema);
