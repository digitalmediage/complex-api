/* eslint-disable no-unused-expressions */
// Core main module dependency
const httpStatus = require('http-status');

// Model
const Property = require('./../DAO/property.dao');

// Utility
const parseQuery = require('./../../utils/parseQuery');
const APIError = require('../../utils/APIError');

exports.getProperties = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const query = req.query;

  // Parse query for Filters on Model (helper fn)
  const filterOptions = ['complex', 'owner', 'name', 'status', 'deal_type', 'createdAt'];
  const parsedQuery = parseQuery(query, filterOptions);
  // eslint-disable-next-line prefer-const
  let options = Object.create(null);

  // Merge Pagination options
  // if query-string no exist set default
  query.page ? options.page = query.page : options.page = 1;
  query.per_page ? options.perPage = parseInt(query.per_page, 10) : options.perPage = 10;


  Property.get(parsedQuery, (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Get all properties',
        data: property,
      });
    }
  }, options);
};

exports.createProperty = (req, res, next) => {
  Property.create(req.body, (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        data: property,
        message: 'Property created successfully',
      });
    }
  });
};

exports.getComplex = (req, res, next) => {
  Property.get_complex({}, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: complex,
      status: 200,
    });
  });
};
