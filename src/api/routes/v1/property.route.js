const express = require('express');
const propertyController = require('./../../complex/controllers/property.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/complex List Property
   * @apiDescription Get a list of Property
   * @apiVersion 1.0.0
   * @apiName ListProperty
   * @apiGroup Property
   * @apiPermission null
   *
   *
   *
   * @apiSuccess {Object[]} users List of Property.
   *
   */

  .get(propertyController.getProperties)
  /**
   * @api {get} v1/complex create Property
   * @apiDescription Create new Property
   * @apiVersion 1.0.0
   * @apiName CreateProperty
   * @apiGroup Property
   * @apiPermission null
   *
   * @apiParam  {String}             name     Property's name
   *
   *
   * @apiSuccess {Object[]} users List of Property.
   *
   */
  .post(authorize(ADMIN), propertyController.createProperty);

// router
//   .route('/complex/:id')
//   .get(propertyController.getComplex);

router
  .route('/:id')
  .get(propertyController.GetComplexById)
  .put(authorize(ADMIN), propertyController.updateProperty)
  .delete(authorize(ADMIN), propertyController.removeComplex);

module.exports = router;
