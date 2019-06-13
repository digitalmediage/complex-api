/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

// Core main module dependency
const httpStatus = require('http-status');

// Models
const ComplexModel = require('./../DAO/complex.dao');
const MediaModel = require('./../models/media.model');

// Utility
const parseQuery = require('./../../utils/parseQuery');
const APIError = require('../../utils/APIError');
const makeResponse = require('./../../utils/makeResponse');
const {
  checkExistedObjectIdAtDocument,
} = require('./../../utils/ModelHelper');
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
    console.log(req.baseUrl);
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

exports.updateComplex = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const shima = 'hamid';
    if (req.params.id !== req.user.id) {
      throw new APIError({
        message: ' Forbidden',
        errors: 'Forbidden',
        status: httpStatus.CONFLICT,
      });
    }
    const query = omit(req.body, 'developer');

    if (req.body.map_image) {
      await checkExistedObjectIdAtDocument(req.body.map_image, MediaModel, null, 'image file not exist');
    }

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
