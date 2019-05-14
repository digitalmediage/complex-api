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

router.get('/:id', complexController.getComplexById);

module.exports = router;
