const express = require('express');
const chargeController = require('./../../manager/controller/charge.controller');
const paymentController = require('./../../manager/controller/payment.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

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

  .post(authorize(), chargeController.CreateCharge);

router
  .route('/charge/:id')
  .put(authorize(), chargeController.updateCharge)
  .delete(authorize(), chargeController.removeComplex);


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
  .post(authorize(), paymentController.createPayment);

router
  .route('/payment/:id')
  .get(paymentController.getPaymentById)
  .put(authorize(), paymentController.updatePayment)
  .delete(authorize(), paymentController.removePayment);

module.exports = router;
