const express = require('express');
const notificationController = require('../../notification/controller/notification.controller');
const {
  authorize,
  ADMIN,
  LOGGED_USER,
} = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(authorize(), notificationController.getNotification)
  .post(authorize(), notificationController.createNotification);

module.exports = router;
