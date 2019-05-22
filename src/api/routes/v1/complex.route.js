
// Main Module Dependency
const express = require('express');
const validate = require('express-validation');

// Controller
const complexController = require('./../../complex/controllers/complex.controller');

// Validator
const {
  createComplex,
  listComplex,
  listDeveloperComplex,
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
  .post(validate(createComplex), complexController.createComplex);

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
router.get('/developer/:developer', validate(listDeveloperComplex), complexController.getDeveloperComplex);
router.get('/test', complexController.test);
router
  .route('/:id')

  .get(complexController.getComplexById)
  .put(validate(updateComplex), complexController.updateComplex)
  .delete(complexController.removeComplex);


module.exports = router;
