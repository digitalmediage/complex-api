/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

// Core main module dependency
const httpStatus = require('http-status');
// Model
const chargeModel = require('./../DAO/charge.dao');

// Utility
const parseQuery = require('./../../utils/parseQuery');
const APIError = require('../../utils/APIError');


exports.CreateCharge = (req, res, next) => {
  chargeModel.create(req.body, (err, charge) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'charge created successfully',
        data: charge,
      });
    }
  });
};

exports.GetCharge = (req, res, next) => {
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


  chargeModel.get(parsedQuery, (err, charge) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        data: charge,
      });
    }
  }, options);
};
