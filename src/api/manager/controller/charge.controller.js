const chargeModel = require('./../DAO/charge.dao');


exports.CreateCharge = (req, res, next) => {
  chargeModel.create(req.body, (err, charge) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      message: 'charge created successfully',
      data: charge,
      status: 201,
    });
  });
};

