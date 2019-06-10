/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
const paymentModel = require('./../DAO/payment.dao');
const httpStatus = require('http-status');
// Utility
const parseQuery = require('./../../utils/parseQuery');
const APIError = require('../../utils/APIError');

exports.getPayments = (req, res, next) => {
  const query = req.query;

  // Parse query for Filters on Model (helper fn)
  const filterOptions = ['developer', 'city', 'name', 'country', 'build_year', 'createdAt'];
  const parsedQuery = parseQuery(query, filterOptions);
  // eslint-disable-next-line prefer-const
  let options = Object.create(null);

  // Merge Pagination options
  // if query-string no exist set default
  query.page ? options.page = query.page : options.page = 1;
  query.per_page ? options.perPage = parseInt(query.per_page, 10) : options.perPage = 10;


  paymentModel.get(parsedQuery, (err, payment) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        data: payment,
      });
    }
  }, options);
};


exports.createPayment = (req, res, next) => {
  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error',
      errors: 'user permission error',
      status: httpStatus.CONFLICT,
    });
  }
  paymentModel.create(req.body, (err, payment) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        data: payment,
        message: 'payment created successfully',
      });
    }
  });
};

exports.getPaymentById = (req, res, next) => {
  if (!req.params.id || req.params.id === null || req.params.id === undefined) {
    throw new APIError({
      message: ' payment not exist ',
      status: httpStatus.CONFLICT,
    });
  }
  paymentModel.getById(req.params.id, (err, payment) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Get Payment',
        data: payment,
      });
    }
  });
};

exports.updatePayment = (req, res, next) => {
  // TODO implement req.body validation
  // const _complex = {
  //   complex_name: req.body.complex_name,
  // };
  if (!req.params.id || req.params.id === null || req.params.id === undefined) {
    throw new APIError({
      message: ' payment not exist ',
      status: httpStatus.CONFLICT,
    });
  }

  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error',
      errors: 'user permission error',
      status: httpStatus.CONFLICT,
    });
  }
  const query = req.body;

  paymentModel.update({
    _id: req.params.id,
  }, query, (err, payment) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Update payment',
        data: payment,
      });
    }
  });
};


exports.removePayment = (req, res, next) => {
  if (!req.params.id || req.params.id === null || req.params.id === undefined) {
    throw new APIError({
      message: ' payment not exist ',
      status: httpStatus.CONFLICT,
    });
  }

  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error manager',
      status: httpStatus.CONFLICT,
    });
  }

  paymentModel.delete({
    _id: req.params.id,
  }, (err, payment) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Payment removed successfully',
        data: payment,
      });
    }
  });
};
