
// Main Module Dependency
const express = require('express');
const validate = require('express-validation');
const { authorize, ADMIN } = require('../../middlewares/auth');

// Controller
const complexController = require('./../../complex/controllers/complex.controller');

// Validator
const {
  createComplex,
  listComplex,
  updateComplex,
} = require('./../../complex/validation/complex.validation');

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

  .get(validate(listComplex), complexController.getComplex)
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
  .post(authorize(ADMIN), validate(createComplex), complexController.createComplex);

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
router
  .route('/:id?')

  .get(complexController.getComplexById)
  .put(authorize(ADMIN), validate(updateComplex), complexController.updateComplex)
  .delete(authorize(ADMIN), complexController.removeComplex);


module.exports = router;
