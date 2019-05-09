'use strict';

module.exports = (router) => {
  router.prefix('/v1');
  router.use('/api', require('./spec'));
  router.use('/complex', require('./routes'));
};
