const mongoose = require('mongoose');
const paymentModel = require('./../model/payment.model');

paymentModel.statics = {
  async create(data, cb) {
    const payment = await new this(data);
    await payment.save(cb);
  },

  async get(query, cb) {
    await this.find(query, cb);
  },
};

module.exports = mongoose.model('Payment', paymentModel);
