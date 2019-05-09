'use strict';

const Router = require('koa-router');
const swagger_jsdoc_spec = require('./../spec/handler');


const router = new Router();
router.get('/spec', swagger_jsdoc_spec.getSwaggerSpec);

module.exports = router.routes();
