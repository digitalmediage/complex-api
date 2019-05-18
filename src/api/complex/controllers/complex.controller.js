const httpStatus = require('http-status');
const ComplexModel = require('./../DAO/complex.dao');

exports.createComplex = (req, res, next) => {
  ComplexModel.create(req.body, (err, complex) => {
    if (err) {
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
  ComplexModel.get({}, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.status(httpStatus.OK);
      res.json({
        message: 'Get complex',
        data: complex,
        status: 200,
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

