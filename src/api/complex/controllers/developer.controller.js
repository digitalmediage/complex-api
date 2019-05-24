const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const UserModel = require('./../../user/models/user.model');
const complexModel = require('./../models/complex.model');
const media = require('./../../complex/models/media.model');


exports.setPermishion = (req, res, next) => {
  if (!req.body.email && req.body.email === null && req.body.email === undefined) {
    throw new APIError({
      message: ' email is required ',
      status: httpStatus.CONFLICT,
    });
  }

  const randomstring = Math.random().toString(36).slice(-8);
  const user = req.user.transform();

  const requestData = {
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
    role: 'manager',
    password: randomstring,
    manager: {
      complex: req.body.complex,
      activation: false,
    },
  };

  const ManagerGenerator = async (cb) => {
    const newManager = new UserModel(requestData);
    await newManager.save(cb);
  };

  try {
    ManagerGenerator((err, manager) => {
      if (err) {
        res.status(httpStatus.BAD_GATEWAY);
        res.json({
          error: err,
        });
      } else {
        res.status(httpStatus.OK);
        res.json({
          message: 'manager created successfully',
          data: manager,
          password: randomstring,
        });
      }
    });
  } catch (err) {
    throw new APIError({
      message: ' Internal Error ',
      status: httpStatus.CONFLICT,
    });
  }
};
