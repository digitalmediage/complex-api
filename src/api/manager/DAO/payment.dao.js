const mongoose = require('mongoose');
const paymentModel = require('./../model/payment.model');

const {
  listPayment
} = require('./../../utils/paginationFilter');

paymentModel.statics = {
  async create(data, cb) {
    const payment = await new this(data);
    await payment.save(cb);
  },

  async get(query, cb, options) {
    await listPayment(query, cb, options.page, options.perPage, this);
  },

  async getById(id, cb) {
    await this.findOne({
      _id: id
    }, cb);
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

module.exports = mongoose.model('Payment', paymentModel);
