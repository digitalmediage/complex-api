/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
const NotificationModel = require('../DAO/notification.dao');

// Utility
const makeResponse = require('./../../utils/makeResponse');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const parseQuery = require('../../utils/parseQuery');


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
    const query = req.query;

    // Parse query for Filters on Model (helper fn)
    const filterOptions = ['createdAt'];
    const parsedQuery = parseQuery(query, filterOptions);
    // eslint-disable-next-line prefer-const

    NotificationModel.get(parsedQuery, (err, complex) => {
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
