const mapModel = require('./../DAO/map_model.dao');

exports.createMapModel = (req, res, next) => {
  mapModel.create(req.body, (err, mapModelObj) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: mapModelObj,
    });

  });
};

exports.getMapModel = (req, res, next) => {
  mapModel.get({ complex: req.complex }, (err, mapModelObj) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: mapModelObj,
    });
  });
};
