const express = require('express');
const chargeController = require('./../../manager/controller/charge.controller');
const paymentController = require('./../../manager/controller/payment.controller');

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
   * @apiSuccess {Object[]}  List of charges.
   *
   */

  .post(chargeController.CreateCharge);

router
  .route('/charge/:id')
  .put(chargeController.updateCharge)
  .delete(chargeController.removeComplex);


router
  .route('/payment')
  .get(paymentController.getPayments)
  /**
   * @api {get} v1/manager/charge create payment
   * @apiDescription Create new payment
   * @apiVersion 1.0.0
   * @apiName CreatePayment
   * @apiGroup manager
   * @apiPermission null
   *
   * @apiParam  {String}             price     manager purchase
   *
   *
   * @apiSuccess {Object[]}  List of payments.
   *
   */
  .post(paymentController.createPayment);

module.exports = router;
