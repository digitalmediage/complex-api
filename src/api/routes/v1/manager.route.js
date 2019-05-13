const express = require('express');
const chargeController = require('./../../manager/controller/charge.controller');

const router = express.Router();


router
  .route('/charge')
  .get(chargeController.GetCharge)
  /**
   * @api {get} v1/manager/charge create charge
   * @apiDescription Create new charge
   * @apiVersion 1.0.0
   * @apiName CreateCharge
   * @apiGroup manager
   * @apiPermission null
   *
   * @apiParam  {String}             price     user purchase
   *
   *
   * @apiSuccess {Object[]} users List of Property.
   *
   */

  .post(chargeController.CreateCharge);

module.exports = router;
