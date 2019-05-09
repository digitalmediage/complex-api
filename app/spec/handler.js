const spec = require('./index');

exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};
