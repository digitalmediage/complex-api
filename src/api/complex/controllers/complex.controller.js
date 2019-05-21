/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

// 3d-party Dependencies
const httpStatus = require('http-status');

// Models
const ComplexModel = require('./../DAO/complex.dao');

// Utility
const parseQuery = require('./../../utils/parseQuery');
const APIError = require('../../utils/APIError');


/**
 * Create new complex
 *
 * @public
 */

exports.createComplex = (req, res, next) => {
  ComplexModel.create(req.body, (err, complex) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.CREATED);
      res.json({
        message: 'Complex created successfully',
        data: complex,
      });
    }
  });
};


/**
 * Get All Complex with filters and limit
 *
 * @public
 */

exports.getComplex = (req, res, next) => {
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
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Get complex',
        data: complex,
      });
    }
  }, options);
};


/**
 * Get All Complex with filters and limit
 *
 * @public
 */

exports.getDeveloperComplex = (req, res, next) => {
  const query = req.query;

  // Parse query for Filters on Model (helper fn)
  const filterOptions = ['city', 'name', 'country', 'build_year', 'createdAt'];
  const parsedQuery = parseQuery(query, filterOptions);

  // Merge developer param with query object
  // eslint-disable-next-line dot-notation
  if (!req.params.developer || req.params.developer === '') {
    throw new APIError({
      message: ' image not uploaded ',
      status: httpStatus.CONFLICT,
    });
  }

  parsedQuery['developer'] = req.params.developer;

  // eslint-disable-next-line prefer-const
  let options = Object.create(null);

  // Merge Pagination options
  // if query-string no exist set default
  query.page ? options.page = query.page : options.page = 1;
  query.per_page ? options.perPage = parseInt(query.per_page, 10) : options.perPage = 10;


  ComplexModel.get(parsedQuery, (err, complex) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Get Developer complex',
        data: complex,
      });
    }
  }, options);
};


// exports.getDeveloperComplexByFilter = (req, res, next) => {
//   const nameFilter = req.query.name;
//   const date = req.query.date;
//   const dateFrom = `$lte ${date}`;
//   const dateTo = `$gte ${date}`;
//   console.log(dateFrom);
//   console.log('date');
//   ComplexModel.get({
//     developer: req.params.developer,
//     $text: {
//       $search: nameFilter,
//       $diacriticSensitive: true,
//     },
//     $and: [{
//       createdAt: dateTo,
//     }],
//   }, (err, complex) => {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     } else {
//       res.status(httpStatus.OK);
//       res.json({
//         message: 'Get Developer complex',
//         data: complex,
//       });
//     }
//   });
// };


exports.getComplexById = (req, res, next) => {
  ComplexModel.getById(req.params.id, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: 'Get complex',
        data: complex,
        status: 200,
      });
    }
  });
};

exports.updateComplex = (req, res, next) => {
  // TODO implement req.body validation
  // const _complex = {
  //   complex_name: req.body.complex_name,
  // };

  ComplexModel.update({
    _id: req.params.id,
  }, req.body, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: 'Update complex',
        data: complex,
        status: 200,
      });
    }
  });
};


exports.removeComplex = (req, res, next) => {
  ComplexModel.delete({
    _id: req.params.id,
  }, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: 'Complex removed successfully',
        data: complex,
        status: 202,
      });
    }
  });
};
