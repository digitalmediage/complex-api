const Complex = require('./../DAO/complex.dao');

exports.createComplex = (req, res, next) => {
  Complex.create(req.body, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      message: 'Complex created successfully',
      data: complex,
      status: 200,
    });
  });
};


exports.getComplex = (req, res, next) => {
  Complex.get({}, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      console.log(complex);

      res.json({
        message: 'Get complex',
        data: complex,
        status: 200,
      });
    }
  });
};

exports.getComplexById = (req, res, next) => {
  Complex.get({ _id: req.params.id }, (err, complex) => {
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
