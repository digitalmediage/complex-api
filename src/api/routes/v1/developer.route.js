const express = require('express');
const validate = require('express-validation');
const controller = require('./../../complex/controllers/developer.controller');
const {
  authorize,
  ADMIN,
  LOGGED_USER
} = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/create_manager')
  .post(authorize(ADMIN), controller.setPermishion);


module.exports = router;
