/* eslint-disable no-path-concat */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const complexRoutes = require('./complex.route');
const propertyRoutes = require('./property.route');
const managerRoutes = require('./manager.route');
const uploadRoutes = require('./upload.route');
const sampleRoutes = require('./sample.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/complex', complexRoutes);
router.use('/property', propertyRoutes);
router.use('/upload', uploadRoutes);
router.use('/manager', managerRoutes);
router.use('/test', sampleRoutes);


module.exports = router;
