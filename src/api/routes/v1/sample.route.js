const express = require('express');
const mapModelController = require('./../../complex/controllers/map_model.controller');

const router = express.Router();

router.post('/map_model', mapModelController.createMapModel);
router.get('/map_model', mapModelController.getMapModel);

module.exports = router;
