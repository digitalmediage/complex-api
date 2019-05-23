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
      res.json({
        error: err,
      });
    }

    res.json({
      data: payment,
    });
  }, options);
};


exports.createPayment = (req, res, next) => {
  paymentModel.create(req.body, (err, payment) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: payment,
      message: 'payment created successfully',
      status: 201,
    });
  });
};

