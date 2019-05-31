/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

// Core main module dependency
const httpStatus = require('http-status');

// Models
const ComplexModel = require('./../DAO/complex.dao');

// Utility
const parseQuery = require('./../../utils/parseQuery');
const makeResponse = require('./../../utils/makeResponse');
// const APIError = require('../../utils/APIError');
const {
  omit,
} = require('lodash');


/**
 * Create new complex
 *
 * @public
 */

exports.createComplex = (req, res, next) => {
  try {
    const user = req.user.transform();
    const query = Object.assign({
      developer: user.id,
    }, req.body);
    ComplexModel.create(query, (err, complex) => {
      makeResponse({
        error: err,
        result: complex,
        message: 'Complex Created successfully',
      }, res, '201');
    });
  } catch (err) {
    return next(err);
  }
};


/**
 * Get All Complex with filters and limit
 *
 * @public
 */

exports.getComplex = (req, res, next) => {
  try {
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

    ComplexModel.get(parsedQuery, (err, complex) => {
      // Get Error and Result for create response
      makeResponse({
        error: err,
        result: complex,
        message: 'Get All Complexes successfully',
      }, res);
    }, options);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get Specific Complex
 *
 * @public
 */

exports.getComplexById = (req, res, next) => {
  try {
    ComplexModel.getById(req.params.id, (err, complex) => {
      // Get Error and Result for create response
      makeResponse({
        error: err,
        result: complex,
        message: 'Get Specific Complex successfully',
      }, res);
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Update Complex
 *
 * @public
 */

exports.updateComplex = (req, res, next) => {
  try {
    const query = omit(req.body, 'developer');

    ComplexModel.update({
      _id: req.params.id,
    }, query, (err, complex) => {
      if (err) {
        res.status(httpStatus.BAD_GATEWAY);
        res.json({
          error: err,
        });
      } else {
        res.status(httpStatus.OK);
        res.json({
          message: 'Update complex',
          data: complex,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove Complex
 *
 * @public
 */

exports.removeComplex = (req, res, next) => {
  try {
    ComplexModel.delete({
      _id: req.params.id,
    }, (err, complex) => {
      // Get Error and Result for create response
      makeResponse({
        error: err,
        result: complex,
        message: 'Delete Complex successfully',
      }, res);
    });
  } catch (err) {
    next(err);
  }
};
