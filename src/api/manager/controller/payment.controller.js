const paymentModel = require('./../DAO/payment.dao');

exports.getPayments = (req, res, next) => {
  paymentModel.get({}, (err, payment) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: payment,
      status: 200
    });
  });
};


exports.createPayment = (req, res, next) => {
  paymentModel.create(req.body, (err, payment) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      data: payment,
      message: 'payment created successfully',
      status: 201,
    });
  });
};

