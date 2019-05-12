const mongoose = require('mongoose');
const mapModelSchema = require('../models/map_model.model');


mapModelSchema.statics = {
  create(data, cb) {
    const mapModel = new this(data);
    mapModel.save(cb);
  },
  get(query, cb) {
    this.find(query, cb);
  },
};


module.exports = mongoose.model('mapModel', mapModelSchema);
