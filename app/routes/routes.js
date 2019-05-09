'use strict';

const Router = require('koa-router');
const complexController = require('../controllers/complex.controller');


const router = new Router();
router.get('/', complexController.FindAll);
router.post('/', complexController.Create);


module.exports = router.routes();
