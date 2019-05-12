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
    }
    console.log(complex);

    res.json({
      message: 'Get complex',
      data: complex,
      status: 200,
    });
  });
};
