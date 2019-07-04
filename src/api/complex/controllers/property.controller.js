/* eslint-disable no-unused-expressions */
// Core main module dependency
const httpStatus = require('http-status');

// Model
const Property = require('./../DAO/property.dao');
const Complex = require('./../DAO/complex.dao');

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

const addToComplex = async (complexId, propertyId, next) => {
  try {
    const complex = await Complex.find({ _id: complexId });
    if (complex || complex !== null || complex !== undefined) {
      console.log('complex__ee__');
      console.log(complex);
      console.log('complex__ee_');
      if (complex.length === 0) {
        throw new APIError({
          message: ' complex not exist ',
          errors: 'complex not exist',
          status: httpStatus.CONFLICT,
        });
      } else {
        console.log('complex_____');
        console.log(complex[0]);
        console.log('complex_____');
        const currentProperties = complex[0].properties;
        currentProperties.push(propertyId);

        await Complex.update(complexId, { properties: currentProperties }, (err, complex) => {
          if (err) {
            throw new APIError({
              message: ' complex cant update ',
              errors: 'complex cant update',
              status: httpStatus.CONFLICT,
            });
          }

          console.log('property added succsesfully');
        });
      }
    }
  } catch (err) {
    return next(err);
  }
};

exports.createProperty = (req, res, next) => {
  Property.create(req.body, async (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      await addToComplex(req.body.complex, property._id, next);
      res.status(httpStatus.OK);
      res.json({
        data: property,
        message: 'Property created successfully',
      });
    }
  });
};

exports.GetComplexById = (req, res, next) => {
  // eslint-disable-next-line prefer-const
  let queryId = {};
  const PropertyId = req.params.id;
  if (!PropertyId || PropertyId !== null || PropertyId !== '') {
    // eslint-disable-next-line dot-notation
    queryId['_id'] = PropertyId;
  } else {
    throw new APIError({
      message: ' property id not exist ',
      status: httpStatus.CONFLICT,
    });
  }
  Property.getById(queryId, (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'get specific property by id',
        data: property,
      });
    }
  });
};

exports.getComplex = (req, res, next) => {
  console.log('query');
  // eslint-disable-next-line prefer-const
  let query = {};
  console.log(query);
  console.log('query');
  const complexId = req.params.id;
  console.log(complexId);
  if (!complexId || complexId !== null || complexId !== '') {
    // eslint-disable-next-line radix
    query['_id'] = complexId;
    console.log('query');
    console.log(query);
    console.log('query');
  }
  Property.get_complex(query, (err, complex) => {
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

exports.updateProperty = (req, res, next) => {
  if (!req.params.id || req.params.id === null || req.params.id === '') {
    throw new APIError({
      message: ' image not uploaded ',
      status: httpStatus.CONFLICT,
    });
  }

  const propertyId = req.params.id;
  console.log('params');
  console.log(propertyId);

  Property.update({ _id: propertyId }, req.body, (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Update property',
        data: property,
      });
    }
  });
};


exports.removeComplex = (req, res, next) => {
  Property.delete({
    _id: req.params.id,
  }, (err, property) => {
    if (err) {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.BAD_GATEWAY);
      res.json({
        message: 'property removed successfully',
        data: property,
      });
    }
  });
};
