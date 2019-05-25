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
  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error manager',
      status: httpStatus.CONFLICT,
    });
  }

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


exports.updateCharge = (req, res, next) => {
  // TODO implement req.body validation
  // const _complex = {
  //   complex_name: req.body.complex_name,
  // };

  if (!req.params.id || req.params.id === null || req.params.id === '') {
    throw new APIError({
      message: ' id not exist ',
      status: httpStatus.CONFLICT,
    });
  }
  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error manager',
      status: httpStatus.CONFLICT,
    });
  }

  const propertyId = req.params.id;

  chargeModel.update({
    _id: propertyId,
  }, req.body, (err, complex) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Update charge',
        data: complex,
      });
    }
  });
};

exports.removeComplex = (req, res, next) => {
  if (!req.params.id || req.params.id === null || req.params.id === '') {
    throw new APIError({
      message: ' id not exist ',
      status: httpStatus.CONFLICT,
    });
  }

  if (req.user.role && req.user.role !== 'manager') {
    throw new APIError({
      message: 'user permission error manager',
      status: httpStatus.CONFLICT,
    });
  }

  const propertyId = req.params.id;
  chargeModel.delete({
    _id: propertyId,
  }, (err, charge) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Charge removed successfully',
        data: charge,
      });
    }
  });
};
