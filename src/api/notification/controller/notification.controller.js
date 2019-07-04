/* eslint-disable consistent-return */
const NotificationModel = require('../DAO/notification.dao');

// Utility
const makeResponse = require('./../../utils/makeResponse');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');


exports.createNotification = (req, res, next) => {
  try {
    const user = req.user.transform();
    if (!user) {
      throw new APIError({
        message: ' Forbidden',
        errors: 'User Not SignIn',
        status: httpStatus.CONFLICT,
      });
    }
    const query = Object.assign({
      owner: user.id,
    }, req.body);
    NotificationModel.create(query, (err, notification) => {
      makeResponse({
        error: err,
        result: notification,
        message: 'Notification Created successfully',
      }, res, '201');
    });
  } catch (err) {
    return next(err);
  }
};

exports.getNotification = (req, res, next) => {
  try {
    NotificationModel.get(req.body, (err, complex) => {
      // Get Error and Result for create response
      makeResponse({
        error: err,
        result: complex,
        message: 'Get All Complexes successfully',
      }, res);
    });
  } catch (err) {
    return next(err);
  }
};
