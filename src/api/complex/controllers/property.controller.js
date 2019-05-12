const Property = require('./../DAO/property.dao');

exports.getProperties = (req, res, next) => {
  Property.get({}, (err, property) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: property,
      status: 200,
    });
  });
};

exports.createProperty = (req, res, next) => {
  Property.create(req.body, (err, property) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: property,
      message: 'Property created successfully',
      status: 201,
    });
  });
};

exports.getComplex = (req, res, next) => {
  Property.get_complex({ name: 'hhhhhh' }, (err, complex) => {
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

