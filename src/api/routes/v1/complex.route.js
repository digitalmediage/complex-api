const express = require('express');
const complexController = require('./../../complex/controllers/complex.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/complex List Complex
   * @apiDescription Get a list of Complex
   * @apiVersion 1.0.0
   * @apiName ListComplex
   * @apiGroup Complex
   * @apiPermission null
   *
   *
   *
   * @apiSuccess {Object[]} users List of users.
   *
   */

  .get(complexController.getComplex)
  /**
   * @api {get} v1/complex create Complex
   * @apiDescription Create new Complex
   * @apiVersion 1.0.0
   * @apiName CreateComplex
   * @apiGroup Complex
   * @apiPermission null
   *
   * @apiParam  {String}             name     complex's name
   *
   *
   * @apiSuccess {Object[]} users List of users.
   *
   */
  .post(complexController.createComplex);

/**
 * @api {get} v1/complex/:id get Complex
 * @apiDescription get specific Complex
 * @apiVersion 1.0.0
 * @apiName getSpecificComplex
 * @apiGroup Complex
 * @apiPermission null
 *
 * @apiParam  {String}             id     complex's is
 *
 *
 * @apiSuccess {Object[]}  specific complex.
 *
 */
router.get('/:id', complexController.getComplexById);
router.put('/update/:id', complexController.updateComplex);
router.delete('/remove/:id', complexController.removeComplex);

module.exports = router;
