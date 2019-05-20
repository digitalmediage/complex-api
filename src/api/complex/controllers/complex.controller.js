/* eslint-disable prefer-destructuring */

// 3d-party Dependencies
const httpStatus = require('http-status');

// Models
const ComplexModel = require('./../DAO/complex.dao');

// Utility
const parseQuery = require('./../../utils/parseQuery');


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


exports.getComplex = (req, res, next) => {
  const query = req.query;

  // Parse query for Filters on Model (helper fn)
  const filterOptions = ['developer', 'city', 'name'];
  const parsedQuery = parseQuery(query, filterOptions);

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
  });
};

exports.getDeveloperComplex = (req, res, next) => {
  ComplexModel.get({
    developer: req.params.developer,
  }, (err, complex) => {
    if (err) {
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
  });
};

exports.testM = (req, res, next) => {
  const oo = {};
  if (req.query.developer) {
    oo.developer = req.query.developer;
  }

  if (req.query.city) {
    oo.city = req.query.city;
  }
  console.time('mongoose');
  ComplexModel.get(oo, (err, data) => {
    if (err) {
      console.log(err);
      console.log('error happened');
      res.send(err);
    } else {
      // console.timeLog('mongoose');
      console.log(data);
      res.send(data);
    }
  });
  console.timeEnd('mongoose');
};

exports.getDeveloperComplexByFilter = (req, res, next) => {
  const nameFilter = req.query.name;
  const date = req.query.date;
  const dateFrom = `$lte ${date}`;
  const dateTo = `$gte ${date}`;
  console.log(dateFrom);
  console.log('date');
  ComplexModel.get({
    developer: req.params.developer,
    $text: {
      $search: nameFilter,
      $diacriticSensitive: true,
    },
    $and: [{
      createdAt: dateTo,
    }],
  }, (err, complex) => {
    if (err) {
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
  });
};


exports.getComplexById = (req, res, next) => {
  ComplexModel.get({
    _id: req.params.id,
  }, (err, complex) => {
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
