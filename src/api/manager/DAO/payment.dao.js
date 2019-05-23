const mongoose = require('mongoose');
const paymentModel = require('./../model/payment.model');

const { listPayment } = require('./../../utils/paginationFilter');

paymentModel.statics = {
  async create(data, cb) {
    const payment = await new this(data);
    await payment.save(cb);
  },

  async get(query, cb) {
    await listPayment(query, cb, options.page, options.perPage, this);
  },
};

module.exports = mongoose.model('Payment', paymentModel);
