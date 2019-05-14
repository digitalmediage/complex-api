const mongoose = require('mongoose');
const newsSchema = require('./../models/news.model');

newsSchema.statics = {
  create(data, cb) {
    const news = new this(data);
    news.save(cb);
  },
  get(query, cb) {
    this.find(query, cb);
  },
};


module.exports = mongoose.model('News', newsSchema);
